export interface DinqAPIResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface UserFlow {
  domain: string;
  user_id: string;
  step: string;
  status: string;
}

export class DinqClient {
  private domain: string | null = null;

  constructor(
    private baseURL: string,
    private token: string
  ) {}

  private async request<T>(
    method: string,
    path: string,
    body?: any
  ): Promise<T> {
    const url = `${this.baseURL}${path}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`,
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API request failed: ${response.status} ${error}`);
    }

    return response.json() as Promise<T>;
  }

  // Get user flow (includes domain)
  async getUserFlow(): Promise<UserFlow> {
    return this.request<UserFlow>("GET", "/api/v1/flow");
  }

  // Get domain (cached)
  async getDomain(): Promise<string> {
    if (this.domain) {
      return this.domain;
    }
    const response: any = await this.getUserFlow();
    // API returns {code, data: {domain, ...}, message}, extract domain from data
    const domain = response.data?.domain || response.domain || "";
    this.domain = domain;
    return domain;
  }

  // Generate a card
  async generateCard(params: {
    type: string;
    datasource_id: string;
    url?: string;
    urls?: Record<string, string>;
    bio?: string;
  }) {
    return this.request("POST", "/api/v1/card/generate", params);
  }

  // Get card board (requires domain/username)
  async getCardBoard() {
    const domain = await this.getDomain();
    return this.request("GET", `/api/v1/card-board?username=${encodeURIComponent(domain)}`);
  }

  // Add a board
  // Note: Backend expects layout INSIDE data object
  async addBoard(params: {
    type: string;
    data: {
      title?: string;
      content?: string;
      type?: string;
      metadata?: Record<string, any>;
      layout?: {
        desktop: { size: string; position: { x: number; y: number } };
        mobile: { size: string; position: { x: number; y: number } };
      };
    };
  }) {
    return this.request("POST", "/api/v1/card-board/add", params);
  }

  // Delete a board
  async deleteBoard(id: string) {
    return this.request("DELETE", `/api/v1/card-board/delete/${id}`);
  }

  // Update card board
  async updateCardBoard(boards: any[]) {
    return this.request("POST", "/api/v1/card-board", { board: boards });
  }
}
