T=$(git config --get http.https://github.com/.extraheader | sed 's/.*Basic //' | base64 -d | cut -d: -f2); SHA=$(git rev-parse HEAD)
for i in $(seq 1 12); do
  R=$(curl -s -H "Authorization: Bearer $T" "https://api.github.com/repos/ravelius/Matkakirja/commits/$SHA/check-runs" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(" ".join(c["name"]+":"+c["status"]+"/"+str(c["conclusion"]) for c in d["check_runs"]))')
  echo "$R"; echo "$R" | grep -q ':' && ! echo "$R" | grep -q 'in_progress\|queued' && break
  timeout 45 tail -f /dev/null
done
