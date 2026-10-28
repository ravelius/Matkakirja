# Julkaisijan luovutus 28.10.2026 klo 15.45 (Macin uudelleenkäynnistys, PT)

Vain voimassa oleva tila (Raamattu 7.22). Historia: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80).
Käytännöt: `docs/raportit/viesti-julkaisija-luovutus-20261026-1601.md` (luku 1) voimassa. Viestit `mcp__ccd_session_mgmt__send_message` id:llä.

## 0. TILA NYT
- **TF 212 ULKONA** (iOS 40546320814, sisäinen 19.12, ulkoinen + beta 20.16, Mac-TF 40559356131 20.38; 211 vanhennettu iOS+Mac).
  Testaajilla vain 212 (TF 208–210 vanhentuneet jo aiemmin). Juna 213 auki (NS, natiivi-backup peili natiiviseppa/juna-213, kärki 4c81da94e 15.2x).
- **Linjat ja simut vapaina**, ei jonoa. L1 = Julkaisija (käännökset/TF), L2 = esikatselut (PT 15.5x: kaikki esikatselut vain L2:lla;
  vanha esikatselu.sh worktreeissä → `git checkout 69bc67131 -- tyokalut/esikatselu.sh`, LR korjasi omansa).
- **Simut:** iso iPad 00CF62C2, KS:n iPhone DA0AAEEA. Iso iPad -laite 00008103: viimeksi LT:n mittaukset; runko ad9759bc6/uudempi takaisin LT:n vastuulla.
- **Käännösapuri:** `julkaisija-tyokalut/ks-kaanna-sha-kansio.zsh <sha[+sha…]> <alikansio>` (L1, _tyo/karttaseppa/). Yhdistelmä a+b+c toimii.
  Jonot AINA skriptitiedostona (ei `while pgrep` -silmukkaa zsh -c:ssä: kuvio osuu omaan komentoriviin → jumi 28.10.). Älä pkillaa
  kuviolla, joka voi esiintyä toisen ajon komentorivillä.
- **Muistivahti:** `simu-muistivahti-odota.zsh <UDID>` SIMU NYT -hetkellä; SIMU VAPAA → pkill "...odota.zsh 00CF62C2$".

## 1. R2-SÄÄSTÖ (omistaja 28.10. 12.28)
- a) VALMIS: PR #5447 mergetty f9db1cc45 (HEAD:t pois eheysvartija/mediakuvat/amparitarkistus/offline). vie-paketti.sh lukee
  `julkaisija-tyokalut/amparin-luettelo.tsv` (11,6 milj. obj., rakennettu 28.10.) + ehdollinen put (ei ylikirjoitusta). Luettelo
  vanhenee CI-vienneistä → `rakenna-luettelo.zsh` kerran viikossa (~33 min, taustalla). Kuluarvio nyt ~42 $/kk; PUT:t (KS:n b) ja dioraama ratkaisevat.
- c) POISTO OMISTAJALLA (PT vie KK:lle): `zsh /Users/Shared/Claude/julkaisija-tyokalut/poista-r2-yhteinen-20261028.zsh`
  (A 61 + dioraama 158 = 219 kansiota, 564 203 obj, 237,8 GB; tarkistaa uusin.json + blender ennen poistoa). Luettelo
  `r2-poisto-yhteinen-luettelo-20261028.tsv`. JU EI aja pysyviä poistoja itse. Ajon jälkeen tarkista `aws s3 ls` muutamalle polulle.
- Huohotus-mp3:t (7): omistajan ajo 20.23 ei tehonnut; `poista-huohotukset.zsh` uudelleen omistajan Terminalissa, tarkista HTTP 404.

## 2. VIENNIT TÄNÄÄN
LR tausta-v62 + muurikate-v19 (juna 213), VS taivas-paiva-codex-v2, KS unesco-havainnekuvat + Stonehenge, PK hahmot-v4.
