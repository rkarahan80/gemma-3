class OutputFormatter:
    """
    Formats the agent's final response for presentation to the user.
    """
    def format_response(self, response_data: dict) -> str:
        """
        Takes the raw response data from the agent (potentially including
        code, text, or structured data) and formats it into a
        user-friendly string.
        """
        if not isinstance(response_data, dict) or "type" not in response_data:
            return "Error: Invalid response data format."

        response_type = response_data.get("type")
        content = response_data.get("content", "")

        if response_type == "content":
            # Simple text or code block
            return str(content)
        elif response_type == "error":
            return f"An error occurred: {content}"
        elif response_type == "tool_result_display": # Custom type for displaying tool results directly
            tool_name = response_data.get("tool_name", "Unknown tool")
            result = response_data.get("result", "No result")
            return f"Tool '{tool_name}' executed. Result: {result}"
        else:
            # Fallback for other types or if content is complex
            # In a real scenario, this might handle various rich content types
            return str(content) # Default to string representation

    def format_code(self, code: str, language: str = None) -> str:
        """
        Formats a code string, potentially with language-specific syntax
        highlighting markers (like Markdown).
        """
        if language:
            return f"```{language}\n{code}\n```"
        return f"```\n{code}\n```"

    def format_message(self, message: str) -> str:
        """
        Formats a general text message.
        """
        return message

    def format_error(self, error_message: str) -> str:
        """
        Formats an error message.
        """
        return f"Error: {error_message}"
