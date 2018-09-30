import win32com.client
word = win32com.client.Dispatch('Word.Application')
doc = word.Documents.Add('c:/users/tyger/desktop/Indeed_resume.html')
doc.SaveAs('c:/users/tyger/desktop/example.doc', FileFormat=0)
doc.Close()
word.Quit()
