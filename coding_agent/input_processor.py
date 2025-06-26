import re

class InputProcessor:
    """
    Processes raw user input to identify intent and extract entities.
    Manages conversation history for context.
    """
    def __init__(self):
        self.conversation_history = []

    def process_input(self, user_input: str) -> dict:
        """
        Analyzes user input to determine intent and extract relevant entities.
        This is a simplified version. A real implementation would use more
        sophisticated NLP techniques or a model for intent recognition.
        """
        self.conversation_history.append({"role": "user", "content": user_input})

        intent = "unknown"
        entities = {}

        # Simple rule-based intent recognition (example)
        if re.search(r"\b(write|generate|create)\b.*?\b(function|class|code|script)\b", user_input, re.IGNORECASE):
            intent = "code_generation"
        elif re.search(r"\b(explain|describe|what does.*?do)\b", user_input, re.IGNORECASE):
            intent = "code_explanation"
        elif re.search(r"\b(debug|fix|error|problem)\b", user_input, re.IGNORECASE):
            intent = "debug_code"
        elif re.search(r"\b(refactor|improve|optimize)\b", user_input, re.IGNORECASE):
            intent = "refactor_code"
        elif re.search(r"\b(add file|load file)\b", user_input, re.IGNORECASE):
            intent = "add_file"
            match = re.search(r"(?:add file|load file)\s*['\"]?(.*?)['\"]?\s*(?:with content|as)\s*['\"]?(.*?)['\"]?$", user_input, re.IGNORECASE | re.DOTALL)
            if match:
                entities["file_path"] = match.group(1).strip()
                entities["content"] = match.group(2).strip()
            else: # try simpler file path only
                match = re.search(r"(?:add file|load file)\s*['\"]?(.*?)['\"]?$", user_input, re.IGNORECASE)
                if match:
                    entities["file_path"] = match.group(1).strip()


        # Simple entity extraction for language (example)
        if "python" in user_input.lower():
            entities["language"] = "python"
        elif "javascript" in user_input.lower():
            entities["language"] = "javascript"
        elif "java" in user_input.lower():
            entities["language"] = "java"

        print(f"[InputProcessor] Intent: {intent}, Entities: {entities}")
        return {"intent": intent, "entities": entities, "raw_input": user_input}

    def add_agent_response(self, agent_response: str):
        self.conversation_history.append({"role": "agent", "content": agent_response})

    def get_history(self) -> list:
        return self.conversation_history
