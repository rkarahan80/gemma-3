from .gemma_interaction import GemmaInteractionModule
from .tool_executor import ToolExecutionEngine
from .workspace_manager import WorkspaceManager

class TaskOrchestrator:
    """
    Manages the overall workflow of a user request.
    Decides when to query Gemma, use tools, or interact with the workspace.
    """
    def __init__(self,
                 gemma_interaction_module: GemmaInteractionModule,
                 tool_executor: ToolExecutionEngine,
                 workspace_manager: WorkspaceManager):
        self.gemma_interaction = gemma_interaction_module
        self.tool_executor = tool_executor
        self.workspace_manager = workspace_manager

    def handle_task(self, processed_input: dict, conversation_history: list) -> dict:
        """
        Handles the task based on processed input from InputProcessor.
        This is the main control loop for a single turn.
        """
        intent = processed_input.get("intent")
        entities = processed_input.get("entities", {})
        user_query = processed_input.get("raw_input")

        # Prepare context for Gemma
        # In a more advanced agent, context would be more sophisticated
        # (e.g., relevant code snippets, previous turns summarized, etc.)
        gemma_context = {
            "history": conversation_history[:-1], # History before current user query
            "workspace_files": {fp: self.workspace_manager.read_file(fp)[:100] + "..."
                                for fp in self.workspace_manager.list_files()} # Preview of files
        }

        # Special handling for 'add_file' intent directly by orchestrator/tool_executor
        if intent == "add_file" and "file_path" in entities and "content" in entities:
            tool_response = self.tool_executor.execute_tool(
                tool_name="add_file",
                tool_args={"file_path": entities["file_path"], "content": entities["content"]}
            )
            if tool_response["status"] == "success":
                return {"type": "content", "content": tool_response["result"]}
            else:
                return {"type": "error", "content": tool_response["error_message"]}
        elif intent == "add_file" and "file_path" in entities and "content" not in entities:
             return {"type": "content", "content": "You asked to add a file, but didn't provide content. Example: 'add file \"test.py\" with content \"print(\'hello\')\"'"}


        # Get available tool schemas to pass to Gemma
        tool_schemas = self.tool_executor.get_all_tool_schemas()

        # Initial query to Gemma
        gemma_response = self.gemma_interaction.query_gemma(user_query, gemma_context, tool_schemas)

        # Check if Gemma requested a tool call
        if gemma_response.get("type") == "tool_call":
            tool_name = gemma_response.get("tool_name")
            tool_args = gemma_response.get("tool_args", {})

            print(f"[TaskOrchestrator] Gemma requested tool: {tool_name} with args: {tool_args}")

            # Execute the tool
            tool_execution_result = self.tool_executor.execute_tool(tool_name, tool_args)

            if tool_execution_result["status"] == "success":
                # Send tool result back to Gemma for further processing
                final_gemma_response = self.gemma_interaction.query_gemma_with_tool_result(
                    original_query=user_query, # Pass original query for context
                    context=gemma_context, # Pass original context
                    tool_name=tool_name,
                    tool_result=tool_execution_result["result"],
                    tool_schemas=tool_schemas
                )
                return final_gemma_response
            else:
                # Handle tool execution error
                print(f"[TaskOrchestrator] Error executing tool {tool_name}: {tool_execution_result['error_message']}")
                return {"type": "error", "content": f"Error during tool execution: {tool_execution_result['error_message']}"}

        # If no tool call, return Gemma's direct response
        return gemma_response
