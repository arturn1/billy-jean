interface SessionResponse {
    success: boolean;
    state: any;  // Você pode especificar um tipo mais específico se souber qual será o tipo esperado para 'state'.
    message: string;
  }