const Page=require('./helper/page');
let page;

const startup=async ()=>{
    page=await Page.build();
    await page.goto('http://localhost:5000/');  //to redirect to URL
}

test('text has a correct header',async()=>{
    await startup();
    const text=await page.getContentOf('h1.display-4.fw-bold.lh-1.mb-3') // the call back will be turned into the string by puppetier and will be sent to chormium instance and this string will turns into a function and will excute and the execution result will be communicated back to node.
    expect(text).toEqual('Blogger');   
})

test('clicking login and login into system',async()=>{
    await page.login();
    const logout=await page.getContentOf('ul li:nth-child(3) a.nav-link');
    await expect(logout).toEqual('Logout');
})

test('click logout working',async()=>{
    await page.click('ul li:nth-child(3) a.nav-link');
    const url=await page.url();
    await expect(url).toEqual('http://localhost:5000/login');
    await page.close();  
})