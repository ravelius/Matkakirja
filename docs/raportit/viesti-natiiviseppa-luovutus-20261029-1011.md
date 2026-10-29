# Natiivisepän luovutus 29.10.2026 klo 10.11 (VIIKKORAJA 97 %, tauko 2.11. klo 03 asti; PT)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna213/jono-213.txt (loppu = uusin);
junan 214 sisältö: juna214/jono-214.txt. Id:t: /Users/Shared/Claude/osoitekirja.md.

## TILA
- **Juna 213 ULKONA:** iOS TF 40759816169 + sisäinen + ulkoinen (28.10.), Mac TF 40828069082 (29.10. 08.21), runko b8a92d661.
- **Juna 214 runko natiiviseppa/juna-214 = 890ee26e8949f7fc954ade8758d3df7a089ac9a8** (wt/proto-natiiviseppa-ehdokas; peili natiivi-backup
  peili/proto/natiiviseppa/juna-214 pushattu). Testit VIHREÄT 2217/761/573, tarkista 0 (09.50).
  Sisältö b8a92d661:n päälle: NUI b48ecd7f8 (pistekerroin), 408d80914 (kohdenostobugit 3–4), 4192cf990 (arkki-tuplat), 616d4b6e0 (nostonimet,
  korvaa 5dd7276c0); PK 21a8962da (porttiovet 65°), pk7-214 20c32559f (kuja 05 -nippu: kk-pohja-v1d-pk7, esto v13, LR tausta-v65 +
  muurikate-v20 + rakennukset-v49 + avoimet-v51; KK pari puhdas, PT kuittasi, JU vei v65 ämpäriin 09.46); KS 93d520848 + aa48b61f7 + d25b6f69f
  (nimet), de6053ab8 (tasangot).
- **EI JUNAAN:** PK pk6-214 7e9c8473c (PT).

## ODOTTAA (junaan 214)
- LR v66 omana eränään (JU:n osoitin + PK/LR:n osoitinmuutos, PT:n kuittauksella).
- KS siirtyma-sse-214 0c14f6d80 (sis. 8ac9ac545 + vaihtoheilunta; pari OK) vasta pienen iPadin mittauksen jälkeen.
- Työtapa jokaiselle erälle: merge --no-ff juna-214:ään → push peiliin → testit → SHA tekijälle + PT.

## JATKOKOMENNOT (Raamattu 12.9)
- Taustaajoja ei ole. Testit: `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh /Users/Shared/Claude/wt/proto-natiiviseppa-ehdokas`
  (kansiossa natiiviseppa-skriptit, loki /Users/Shared/Claude/proto-3d/lokit/testit-runko-<sha9>.log).
- Cronit (session omat, luo uudelleen): postilaatikkovahti "17,47 * * * *", Unity-beeta "4 9 * * *" (unity-julkaisut.py; 29.10. ei uutta, b6 uusin).
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas. Mittausskriptit: viesti-natiiviseppa-luovutus-20261028-1650.md.
