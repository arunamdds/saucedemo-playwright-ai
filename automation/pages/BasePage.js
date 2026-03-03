class BasePage {
    constructor(page){
        this.page = page;
    }
    async navigate(url){
        await this.page.goto(url);
    }
    async getTtle(){
        return await this.page.title();
    }
}

module.exports = BasePage;