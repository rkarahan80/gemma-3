from .input_processor import InputProcessor
from .task_orchestrator import TaskOrchestrator
from .gemma_interaction import GemmaInteractionModule
from .tool_executor import ToolExecutionEngine
from .output_formatter import OutputFormatter
from .workspace_manager import WorkspaceManager

class CodingAgent:
    """
    The main class for the AI Coding Agent.
    Orchestrates the interaction between various components.
    """
    def __init__(self, gemma_model_name: str = "gemma-3-mock"):
        self.workspace_manager = WorkspaceManager()
        self.input_processor = InputProcessor()
        # Order of initialization below matters due to dependencies
        self.tool_executor = ToolExecutionEngine(self.workspace_manager)
        self.gemma_interaction_module = GemmaInteractionModule(model_name=gemma_model_name)
        self.task_orchestrator = TaskOrchestrator(
            self.gemma_interaction_module,
            self.tool_executor,
            self.workspace_manager
        )
        self.output_formatter = OutputFormatter()

        print("[CodingAgent] Initialized successfully.")

    def process_message(self, user_message: str) -> str:
        """
        Processes a user's message and returns the agent's response.
        This is the main entry point for interacting with the agent.
        """
        print(f"\n[CodingAgent] Received user message: \"{user_message}\"")

        # 1. Process input
        processed_input = self.input_processor.process_input(user_message)

        # 2. Handle task via Orchestrator
        # The orchestrator will interact with Gemma and Tools as needed
        agent_response_data = self.task_orchestrator.handle_task(
            processed_input,
            self.input_processor.get_history()
        )

        # 3. Format output
        formatted_response = self.output_formatter.format_response(agent_response_data)

        # 4. Add agent's response to history (for context in next turn)
        self.input_processor.add_agent_response(formatted_response) # Storing formatted response for simplicity

        print(f"[CodingAgent] Sending response: \"{formatted_response}\"")
        return formatted_response

# Basic example of how to use the agent (for testing)
if __name__ == "__main__":
    print("--- Coding Agent Test ---")
    agent = CodingAgent()

    # Test Case 1: Simple code generation
    response1 = agent.process_message("Hey, can you generate python code for sum of a list?")
    # Expected: Python code for summing a list.

    # Test Case 2: Add a file to workspace (direct handling)
    response2 = agent.process_message("add file \"example.py\" with content \"def hello():\\n  print(\'Hello, Gemma!\')\"")
    # Expected: Confirmation of file addition.

    # Test Case 3: Ask to read the file (tool call via Gemma)
    response3 = agent.process_message("Now, please read the file example.py and tell me about it.")
    # Expected: Gemma confirms reading and might ask what to do next or summarize.

    # Test Case 4: Ask a question about the file content (Gemma uses context from tool call)
    response4 = agent.process_message("Can you explain this python code in example.py?") # A bit generic
    # A more specific query for the mock Gemma would be: "explain this python code def hello(): ..."

    # Test Case 5: List files (tool call via Gemma)
    response5 = agent.process_message("What files are in the workspace?")
    # Expected: List containing "example.py"

    # Test Case 6: Unknown intent
    response6 = agent.process_message("Tell me a joke.")
    # Expected: Mock Gemma's default response.

    print("\n--- End of Coding Agent Test ---")
