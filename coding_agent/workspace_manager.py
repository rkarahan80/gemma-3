class WorkspaceManager:
    """
    Manages access to files and project context for the coding agent.
    For now, it will use in-memory storage for file contents.
    """
    def __init__(self):
        self._files = {}  # path: content

    def add_file(self, file_path: str, content: str):
        """Adds or updates a file in the workspace."""
        self._files[file_path] = content
        print(f"[WorkspaceManager] File added/updated: {file_path}")

    def read_file(self, file_path: str) -> str | None:
        """Reads a file from the workspace."""
        if file_path in self._files:
            print(f"[WorkspaceManager] Reading file: {file_path}")
            return self._files[file_path]
        else:
            print(f"[WorkspaceManager] File not found: {file_path}")
            return None

    def get_all_files(self) -> dict:
        """Returns all files in the workspace."""
        return self._files.copy()

    def remove_file(self, file_path: str) -> bool:
        """Removes a file from the workspace."""
        if file_path in self._files:
            del self._files[file_path]
            print(f"[WorkspaceManager] File removed: {file_path}")
            return True
        print(f"[WorkspaceManager] File not found for removal: {file_path}")
        return False

    def list_files(self) -> list[str]:
        """Lists all file paths in the workspace."""
        return list(self._files.keys())

    # In a real scenario, methods for applying changes to actual files
    # with user confirmation would be here.
    # def propose_change(self, file_path: str, new_content: str): ...
    # def apply_change(self, file_path: str): ...
