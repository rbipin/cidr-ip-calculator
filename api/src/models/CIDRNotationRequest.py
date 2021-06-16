from pydantic import BaseModel
from typing import Optional


class CIDRNotationRequest(BaseModel):
    StartingIP: Optional[str]
    EndingIP: Optional[str]
