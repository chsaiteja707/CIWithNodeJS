const Page=require('./helper/page');

let page;



const startup=async ()=>{
    page=await Page.build();
    await page.goto('http://localhost:5000/');  //to redirect to URL
    await page.setViewport({ width: 1366, height: 768});
}

const afterEach=async()=>{
    await page.close()
}

describe('when logged in',()=>{
    it('open login page',async()=>{
        await startup();
        const text=await page.getContentOf('h1.display-4.fw-bold.lh-1.mb-3') // the call back will be turned into the string by puppetier and will be sent to chormium instance and this string will turns into a function and will excute and the execution result will be communicated back to node.
        expect(text).toEqual('Blogger');
        await page.login();
    })
    
    test('can see blog create form',async()=>{ 
        const newLink=await page.getContentOf('a.nav-link.new-item-link');
        await expect(newLink).toEqual('New');
        await page.click('a.nav-link.new-item-link');
    })

    describe('check whether able to create new blog',()=>{
        const date=Date.now();  
        var user={
            blogname:`${date} new blog`,
            description:`${date} new discription`,
        }
        it('create new blog', async()=>{
            const url=await page.url();   
            await expect(url).toEqual('http://localhost:5000/blog');
            await page.waitForSelector("button.w-100.btn.btn-lg.btn-primary"); 
            await page.type('#floatingInput-newBlog',user.blogname);
            await page.type('#floatingPassword-newBlog',user.description);
            await page.click('.w-100.btn.btn-lg.btn-primary');
            await afterEach();
        })
    })
})

describe('User is not logged in',async()=>{
    test('user cannot create blogpost',async()=>{
        const result=await page.evaluate(()=>{
            fetch('https://localhost:5000/blogs',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json());
        })
    })

    expect((result).toEqual({error:'You must log in !'}))
})

