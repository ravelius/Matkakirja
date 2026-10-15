from pathlib import Path
import subprocess,sys,json,time
S=Path(__file__).resolve().parent
P=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/petrin-tavoitehavainnekuvat-20261014')
PY='/Users/samireivinen/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3'
BL='/Applications/Blender.app/Contents/MacOS/Blender'
R=sys.argv[1];root=P/'models'/R
subprocess.run([sys.executable,str(S/'prepare274.py'),R],check=True)
subprocess.run([sys.executable,str(S/'record274.py'),R,'issued'],check=True)
for file,cmd in [('render-run.log',[BL,'-b','-t','4','--python',str(root/'build_and_render.py')]),('analysis.log',[PY,str(root/'analyse_round.py')]),('model-audit.log',[BL,'-b','-t','4','--python',str(root/'audit_saved_model.py')])]:
    with (root/file).open('w') as log:
        result=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
    if result.returncode:
        print((root/file).read_text()[-4000:]);sys.exit(result.returncode)
    if 'Traceback (most recent call last)' in (root/file).read_text():
        print((root/file).read_text()[-4000:]);sys.exit(1)
m=json.loads((root/'qa/metrics.json').read_text())
assert json.loads((root/'saved-model-audit.json').read_text())['savedBlendReadbackPassed']
print(json.dumps({'round':R,'nativeRenderedIoU':{r['view']:round(r['silhouetteIoUPercent'],3) for r in m['perView']},'allIoUThresholdsPassed':m['allIoUThresholdsPassed']}),flush=True)
