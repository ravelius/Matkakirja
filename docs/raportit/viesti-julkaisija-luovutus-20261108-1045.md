# Julkaisija: luovutus 8.11.2026 klo 10.45 (korvaa -0910:n; -0910:n, -0425:n ja -0003:n OPIT voimassa: git show 5d9738c87:docs/raportit/viesti-julkaisija-luovutus-20261108-0910.md)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (grep 'AJO |VIKA|laitekaannos VALMIS|SEIS'), tail -40 jonolokista: mitä jäi kuittaamatta. Kaikki nohupilla.

## 1. Juna 221 ja TF (valmis tältä osin)
- OMISTAJA 09.24 "Julkaise 221 nyt" → TF 1.1 (221) = 52e73d18b, ajo 42458775622 success 09.42, muutosloki #6494.
- OMISTAJA 09.39 kohokartta mukaan → NUI 5d6967444 (ff 52e73d18b:n päälle, ei merenpohjaa), unity sh 0 (T/juna221-kohokartta-unity-tarkistus.txt),
  natiivi-backup julkaisija/juna-221 = 5d69674443ec. TF 1.1 (222) = 5d6967444, ajo 42460254109 success 10.05, muutosloki #6495
  (ensimmäinen ajo 42460074505 kaatui puuttuvaan muutoslokiriviin: RIVI MAINIIN ENNEN workflow runia). Laskuri P/lokit/testflight-ordinaali.txt = 222.
- Asemataulu: juna.py lisaa kohokartta tehty; juna.py tf HYLÄTTY (Työn alla ei tyhjä) → PT kirjaa. PT:lle kerrottu.
- Seuraava TF vain omistajan sanalla. NUI:n puuvian korjaus 50200fb68 (natiivi-ui/puut-nimet-221) EI vielä junassa: odottaa panorointi-2-paria ja PT:n sanaa.

## 2. Ämpärit
- KS merenpohja-koe VALMIS 10.25: julisteet/maasto/2026-11-08-kohokartta-merenpohja-koe/ 32754/32754, layer.json 200, CDN ok (T/vie-maasto-massa-sisainen.zsh = sisälevyn muunnelma). Rivi PT, NUI, KS.
- KS kohokartta v6 KÄYNNISSÄ pid 53921 (T/ks-kohokartta-v6-vienti.zsh) → linssit/topografia/kohokartta/v6-20261108/, 8 osaa; valmis-rivi "AJO KS kohokartta v6" → KS:lle (local_740947d7-aa79-4b1e-948e-1b7dfc734364) + CDN-otos (curl media.matkakirja.app/<polku> 200 image/jpeg).
- KS:n koko maailma (merenpohja) tulossa uuteen kansioon: odota KS:n polkua; sama tapa kuin koealue (vie-maasto-massa-sisainen.zsh, jos sisälevyllä; nimen pitää olla kohokartta-merenpohja-*-vienti-* tai lisää case-ehtoon).

## 3. KÄYNNISSÄ 10.45 (iPad-lukko: NUI pollaa 1 s, NS navat 2 s, PK 10 s → järjestys NUI, NS, PK)
- NS navat-koho verrokki 5d6967444 pid 63077 iPadilla nyt (T/ns-navat-verrokki.zsh); uusi ca92af647 pid 63078 laitekäännös L2 jonossa (T/ns-navat-uusi.zsh).
  iPhone "unavailable" → ISO iPad, skenaario P/_tyo/natiiviseppa/navat-koho/sk-navat-ipad.txt. Kansiot P/lokit/natiiviseppa-navat-koho/{verrokki,uusi}
  (AJO-rivin "kansio"-teksti väärin, oikea tämä). Kuvapolut + napakannet-rivi (uudessa 16/16 odotettu) NS:lle (local_99130238-aa54-4a29-bcc9-7a023584944b). NS tekee parit KK:lle.
- NUI puut-panorointi-2 50200fb68 pid 81668 (laitekäännös L1 käynnissä) → iPad, kansio P/lokit/nui-puut-panorointi-2-50200fb68. KIIRE (omistajan puuvika). Kuittaus NUI:lle (local_43962c89-fc14-4098-9dd7-6153133ffcea).
- PK ositus g+f e59541a34 pid 29768 (T/pk-ositus4.zsh): laitekäännös odottaa kopiolukkoa → g, sitten f → lokit/pelikoodari-lataus-ositus-{g,f}. Kuittaus rivillä PK:lle (local_91a1bc27-6870-46aa-9886-66fd33b68880).

## 4. Kuitattu tällä vuorolla
NUI panorointi-1 (12/12, huippu 3069); PK ositus a/b/c/e/d (kaikki ELOSSA, huiput 4345–4484 Mt); VS meripainuu-ipad (4/4, meri painuu True) + Mac meripainuu2-pohja/meripainuu2/vesikerros2; NS aloituslento-3 j3 (KYLMA ok 3/3, etukäteen 219).

## OPIT
- Kääreen tappaminen kesken laitekäännöksen jättää /tmp/ju-laite-kopio.lukko orvoksi (laite-iso.zsh:n trap ei aja, laite-sha jatkaa orpona) → kaikki käännökset jumiin. Tarkista: ls -la /tmp/ju-laite-kopio.lukko + ps laite-sha; poista vain jos laite-sha ei käynnissä.
- sed-muunnoksissa tarkista KAIKKI skriptipolut (aloituslento-ajo-2 → -3 jäi ensin).
- TF-workflow: muutosloki "1.1 (N)" pitää olla mainissa ENNEN ajoa (vaihe "Muutoslokin rivi").

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille (local_afae44f0-722b-4541-a3b8-30ca4f76543b).
