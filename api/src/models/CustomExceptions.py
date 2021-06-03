class CustomException(Exception):
    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(self.message)


class NullArgumentException(CustomException):
    def __init__(self, message: str) -> None:
        super().__init__(message)


class BadArgumentExcepton(CustomException):
    def __init__(self, message: str) -> None:
        super().__init__(message)
