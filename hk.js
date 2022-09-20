const puppeteer=require("puppeteer");
const loginlink="https://www.hackerrank.com/auth/login";
const answer=require('./codes')
//signup with temporary email id
const email="hevik90453@keyido.com";
const password="123456789";

//there should be semicolon before iffe function if declared variable
(async function(){
    try {
        const browserInstance= await puppeteer.launch({headless:false, args: ['--start-maximized'], defaultViewport:null})
        let newtab=await browserInstance.newPage()
        await newtab.goto(loginlink)
        await newtab.type("#input-1",email,{delay:50})
        await newtab.type("#input-2",password,{delay:50})
        await newtab.click("button[data-analytics='LoginPassword']",{delay:50})
        await waitAndClick("a[data-attr1='algorithms']",newtab)
        await waitAndClick("input[value='warmup']",newtab)
        let allchallenges=await newtab.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled")
        console.log('Total Questions',allchallenges.length)
        await questionSolver(newtab,allchallenges[0],answer[0])
    } catch (error) {
        console.log(error);
    }
})()

async function waitAndClick(selector,cpage){
    await cpage.waitForSelector(selector)
    let selectorClicked=cpage.click(selector)
    return selectorClicked
}

async function questionSolver(page,question,answer){
    await question.click()
    await waitAndClick('.monaco-editor.no-user-select.vs',page)
    await waitAndClick('.checkbox-input',page)
    await page.waitForSelector('textarea.custominput')
    await page.type('textarea.custominput',answer,{delay:10})
    await page.keyboard.down('Control')
    await page.keyboard.press('A',{delay:100})
    await page.keyboard.press('X',{delay:100})
    await page.keyboard.up('Control')
    await waitAndClick('.monaco-editor.no-user-select.vs',page)
    await page.keyboard.down('Control')
    await page.keyboard.press('A',{delay:100})
    await page.keyboard.press('A',{delay:100})
    await page.keyboard.press('V',{delay:100})
    await page.keyboard.up('Control')
    await page.click('.hr-monaco__run-code',{delay:50})
}
