import { handleSubmit } from "../src/client/js/formHandler"
import { response } from "express"

test ('The data is not empty', async () => {
    const data = await response.json();
    expect(data).not.ToBeNull();
})