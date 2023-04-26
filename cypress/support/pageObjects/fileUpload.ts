//https://www.webdriveruniversity.com/File-Upload/index.html

export class FileUpload{
    getChooseFile () {
        return cy.get("#myFile")
    }
    getSubmit()
    {
        return cy.get("#submit-button")
    }
}
export const onFileUpload = new FileUpload()
