const pupt=require('puppeteer');

const userFactory=require('../factories/UserFactory');

class CustomPage{
    static async build(){
        //the below args will be used to decrease the amount of test to be run
        const browser=await pupt.launch({
            headless:true,
            args:['--no-sandbox']
        })
        const page=await browser.newPage();
        const customPage=new CustomPage(page,browser);
        return new Proxy(customPage,{
            get: (target,property)=>{
                //the below order is incorrect since close method is available in page class as well as in the browser class but however we need this only in the browser class
                //so to fix this we are directly assigning the close method from the browser class to customPage
                return customPage[property] || page[property] || browser[property]
            }
        })
    }

    async login(){
        const date=Date.now();  
        var user={
            username:`sai${date}@email.com`,
            password:`sai${date}@email.com`,
            email:`sai${date}@email.com`
        }

        await userFactory(user);
        await this.page.waitForSelector('button.w-100.btn.btn-lg.btn-primary');
        await this.page.type('#floatingInput',user.username);
        await this.page.type('#floatingPassword',user.password);
        await this.page.click('.w-100.btn.btn-lg.btn-primary');
        const url=await this.page.url();   
        await expect(url).toMatch('localhost\:5000/');   
        await this.page.waitForSelector("a.nav-link");
    }

    async getContentOf(selector){
        return this.page.$eval(selector,el=>el.innerHTML);
    }

    close(){
        this.browser.close();
    }

    // addBlog()

    constructor(page,browser){
        this.browser=browser;
        this.page=page;
    }
}

module.exports=CustomPage;