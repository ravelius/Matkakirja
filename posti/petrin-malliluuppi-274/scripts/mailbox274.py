from pathlib import Path
import subprocess,json,sys,hashlib
P=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/petrin-tavoitehavainnekuvat-20261014');C=P/'models/continuation-274'
W=Path('/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/worktrees/petrin-tavoitehavainnekuvat-20261014');REF='refs/remotes/codex-petrin/claude-postilaatikko'
def git(*args):return subprocess.check_output(['git','-C',str(W),*args])
def run(*args):subprocess.run(['git','-C',str(W),*args],check=True)
def guard():
 run('fetch','--no-tags','origin','refs/heads/claude/postilaatikko:'+REF)
 sources={'posti/petrin-codex-tilaus.md':'9432d692cf55990413625adfb099e7d2c6a8a820','posti/petrin-faktat.md':'2bc92eedd1ae31f5bda7f9a72d0234ad705d119a','posti/petrin-LISAYS-maskit.md':'e1ff52aa5a15fe969cc0c2f4be4a529142a7e587','posti/fable-codex-petrin-K5-hyvaksytty-20261015.md':'b074b1943dceb2d1faefff44a4f3d64be00cd78f','posti/fable-codex-petrin-K5-maskikorjaus-20261015.md':'a5a8769b17a6d7071ed66bc5107eaacffe955fcb','posti/fable-codex-petrin-M01-palaute-20261015.md':'d7a51d3d4e1f39cec063e530e9ce1eb445601a24','posti/fable-codex-petrin-M09-palaute-20261015.md':'b93049955540c0e6bf5ff853eb66d58b54be9840'}
 for n,b in sources.items():assert git('rev-parse',REF+':'+n).decode().strip()==b,('Source changed',n)
 changed=git('diff','--name-only','e8a797c5e3aaf2360c8bbd39db375a7a1fdf3fde..'+REF,'--','posti/*petrin*.md').decode().splitlines()
 changed=[x for x in changed if x!='posti/codex-fable-petrin-malliluuppi-274-20261015.md' and not x.startswith('posti/petrin-malliluuppi-274/')]
 assert not changed,('New relevant mailbox source requires reading before delivery',changed)
if sys.argv[1]=='preflight':
 assert not git('status','--porcelain').strip();guard();run('rebase',REF);print('Mailbox source guard passed and isolated branch updated.')
elif sys.argv[1]=='send':
 staged=json.loads((C/'staging-files.json').read_text());names=sorted(staged['files'])
 for n,v in staged['files'].items():
  b=(W/n).read_bytes();assert hashlib.sha256(b).hexdigest()==v['sha256'] and len(b)==v['bytes'],n
 run('add','--',*names);assert set(git('diff','--cached','--name-only').decode().splitlines())==set(names);run('diff','--cached','--check')
 run('commit','-m','Petřín #274: deliver M11–M15 loop, best/latest M15 for feedback')
 for attempt in range(3):
  guard();run('rebase',REF)
  result=subprocess.run(['git','-C',str(W),'push','origin','HEAD:refs/heads/claude/postilaatikko'])
  if result.returncode==0:break
 else:raise RuntimeError('Three normal mailbox push attempts failed; no force push used')
 run('fetch','--no-tags','origin','refs/heads/claude/postilaatikko:'+REF);print('Normal mailbox push completed; remote byte verification still required.')
else:raise ValueError(sys.argv[1])
