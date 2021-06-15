from pydantic import BaseModel
from typing import Optional


class CIDRNotation(BaseModel):
    IP: Optional[str]
    CIDR: Optional[int]
