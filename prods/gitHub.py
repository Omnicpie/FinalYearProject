from github import Github
import subprocess as cmd

#this will be for reading it later 
g = Github('c8cdca51b807bd38105cb5d4012ac1d738664bc1')

repo = g.get_user().get_repo("FinalYearProds")
print(repo.name)
#print(repo.get_contents(""))

contents = repo.get_contents("coopProds.txt")


#the actually useful bit
cp = cmd.run("git add .", check=True, shell=True)
print(cp)
cp = cmd.run(f"git commit -m 'auto' --allow-empty-message", check=True, shell=True)
print(cp)
cp = cmd.run("git push -u origin main -f", check=True, shell=True)
print(cp)

