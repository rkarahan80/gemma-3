from .workspace_manager import WorkspaceManager

class ToolExecutionEngine:
    """
    Executes tools (functions) requested by the Gemma 3 model or the Task Orchestrator.
    This version will directly call known internal tools.
    A real version would handle calls to external APIs, shell commands etc.
    """
    def __init__(self, workspace_manager: WorkspaceManager):
        self.workspace_manager = workspace_manager
        self.available_tools = {
            "read_file": self._read_file,
            "add_file": self._add_file,
            # "write_file": self._write_file, # Requires more care for safety
            "list_files": self._list_files,
            # "run_linter": self._run_linter, # Example of an external tool
        }

    def execute_tool(self, tool_name: str, tool_args: dict) -> any:
        """
        Executes a specified tool with given arguments.
        """
        if tool_name in self.available_tools:
            print(f"[ToolExecutor] Executing tool: {tool_name} with args: {tool_args}")
            try:
                result = self.available_tools[tool_name](**tool_args)
                return {"status": "success", "result": result}
            except Exception as e:
                print(f"[ToolExecutor] Error executing tool {tool_name}: {e}")
                return {"status": "error", "error_message": str(e)}
        else:
            print(f"[ToolExecutor] Unknown tool: {tool_name}")
            return {"status": "error", "error_message": f"Tool '{tool_name}' not found."}

    # --- Internal Tool Implementations ---

    def _read_file(self, file_path: str) -> str | None:
        """Reads content of a file from the workspace."""
        return self.workspace_manager.read_file(file_path)

    def _add_file(self, file_path: str, content: str) -> str:
        """Adds or updates a file in the workspace."""
        self.workspace_manager.add_file(file_path, content)
        return f"File {file_path} added/updated successfully."

    # def _write_file(self, file_path: str, content: str) -> str:
    #     """
    #     (Placeholder) Writes content to a file.
    #     In a real agent, this would need careful implementation regarding
    #     permissions and user confirmation.
    #     """
    #     self.workspace_manager.add_file(file_path, content) # For now, same as add
    #     return f"File {file_path} written successfully (simulated)."

    def _list_files(self) -> list[str]:
        """Lists all files in the workspace."""
        return self.workspace_manager.list_files()

    # def _run_linter(self, file_path: str, language: str) -> dict:
    #     """
    #     (Placeholder) Runs a linter on a specified file.
    #     This would involve calling an external linter tool.
    #     """
    #     print(f"[ToolExecutor] Simulating linter run on {file_path} for {language}")
    #     # Example output
    #     return {"issues_found": 2, "details": [
    #         {"line": 10, "message": "Syntax error"},
    #         {"line": 25, "message": "Unused variable"}
    #     ]}

    def get_tool_schema(self, tool_name: str) -> dict | None:
        """
        (Placeholder) Returns a schema for a tool, useful for Gemma function calling.
        """
        # This would be more detailed in a real implementation,
        # following OpenAI function calling schema or similar.
        if tool_name == "read_file":
            return {
                "name": "read_file",
                "description": "Reads the content of a specified file from the workspace.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "file_path": {"type": "string", "description": "The path to the file to read."}
                    },
                    "required": ["file_path"]
                }
            }
        elif tool_name == "add_file":
            return {
                "name": "add_file",
                "description": "Adds a new file or overwrites an existing file in the workspace.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "file_path": {"type": "string", "description": "The path for the new or existing file."},
                        "content": {"type": "string", "description": "The content of the file."}
                    },
                    "required": ["file_path", "content"]
                }
            }
        elif tool_name == "list_files":
            return {
                "name": "list_files",
                "description": "Lists all files currently managed in the agent's workspace.",
                "parameters": {"type": "object", "properties": {}}
            }
        return None

    def get_all_tool_schemas(self) -> list[dict]:
        """Returns schemas for all available tools."""
        return [self.get_tool_schema(name) for name in self.available_tools if self.get_tool_schema(name)]
