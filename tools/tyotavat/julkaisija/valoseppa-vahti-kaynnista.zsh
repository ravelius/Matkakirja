#!/bin/zsh
# Julkaisija 14.10.2026: käynnistää Valosepän vahdin irrotettuna (setsid), tuloste valoseppa-vahti.out.
# Pysäytys: kill $(cat /tmp/matkakirja-valovahti.pid)
T=/Users/Shared/Claude/julkaisija-tyokalut
if [[ -f /tmp/matkakirja-valovahti.pid ]] && ps -p $(cat /tmp/matkakirja-valovahti.pid) >/dev/null 2>&1; then
  echo "vahti jo käynnissä (pid $(cat /tmp/matkakirja-valovahti.pid))"; exit 1
fi
perl -MPOSIX -e 'POSIX::setsid(); exec @ARGV' zsh $T/valoseppa-vahti.zsh >> $T/valoseppa-vahti.out 2>&1 < /dev/null &
sleep 2; echo "vahti pid $(cat /tmp/matkakirja-valovahti.pid)"
