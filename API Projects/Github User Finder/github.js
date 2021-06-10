class Github {
  constructor() {
    this.client_id = '780d431a69b255b23171';
    this.client_secret = 'c08a87b0cb12e0f4275e2162395d4ea069cda873';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {

    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    return{
      profile,
      repos
    }

  }
}