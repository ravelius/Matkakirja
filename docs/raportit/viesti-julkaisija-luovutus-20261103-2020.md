# Julkaisija: luovutus 3.11.2026 klo 20.20 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-1925.md (af43742a2).
Jonoloki: julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila). Kaikki ketjut nohup, kirjoittavat <nimi>.pid (TAPPO VAIN NIILLÄ).

## !!! OPPI 19.4x: `devicectl device process launch --console` → CoreDeviceError 10002 isolla iPadilla joka kerta
Ilman --consolea toimii. Kaikki uudet laiteskriptit ilman konsolia; muisti luetaan laitteen Documents-lokeista.
NUI:n työkalu: proto-3d/lokit/nui-lahizoom-20261103/mittaa-ilman-konsolia.zsh <iso|pieni> <tunniste>. Vanha mittaa.zsh EI toimi.
Keisarikuvat: julkaisija-tyokalut/keisari-kuva-iso3.zsh (konsoliton). PT: kokeile iPadin uudelleenkäynnistystä kerran, kun iPad on vapaa (EI tehty).
Lisäksi: 19.52 keisari-iso3 kuoli kuvien jälkeen ja jätti iPad-lukon → poistettu (oma, kuollut pid). Jos lukko jumittaa, tarkista kuka/pid: kill -0.

## ISO PAKETTI ea2d6912f (wt /Users/Shared/Claude/wt/julkaisija-koe-218) = 7ac89ff33 + NUI e971e1992 (PT junalupa 20.0x)
Laitekäännös lokit/julkaisija-laite-218-ea2d6912f (20.04).
- Kortti auki → lähizoom (7ac89ff33-2:n kaatumispolku): OK huippu 3659 Mt, 0 varoitusta, ei kaatumista → PT/NUI kerrottu. lokit/nui-lahizoom-20261103/iso-ea2d6912f-1/
- Käynnissä iPadilla: keisari-kuva-iso3-ea2d6912f.zsh → sitten sulku-ea2d6912f.zsh (kohdenosto → `ui sulje` = ✕:n Sulje (NUI) → 10 s → lähizoom +
  muistivahti; SULKURIVI ja "sumennus pois" vaiheet.txt:ssä; lokit iso-ea2d6912f-sulku/). TULOS PT + NS + NUI (PT: sulku ratkaisee).
- Kun ea2d6912f-kaatumistodistus (kortti auki + sulku) OK: liitä NUI 20b21efee (elävä kartta, PT junalupa) isoon pakettiin.
  20b21efee-simutodistus OK jo: lokit/todistus-elava-kartta-20b21efee-20261103-1957/ (ef37c2b84).
- 7ac89ff33: muistivahti VIKA 4190 Mt lähizoomissa (kaatui) → korjattu e971:llä; keisarikuvat 4/4 OK (lokit/julkaisija-keisari-iso-7ac89ff33-1946/, huippu 2972 Mt).

## iPad-jono (mkdir /tmp/matkakirja-ipad.lukko)
1) keisari ea2d6912f (käynnissä 20.15) 2) sulku-ea2d6912f.zsh 3) keisari-kk.zsh: PK:n aja-ipad.zsh 7ac89ff33 (KK:n keisarikuvat; ilmoita PK:lle)
4) laite-koealue-fb7ff2595.zsh (VS k5 + NS esineet: käännös L1 + n-lahi/p-lahi/keski/laaja → VS, NS, PT; ei iso pakettiin).

## Linjat
- L1: keisari-kk.zsh (a) iPhone-simu pystyssä 7ac89ff33 (käännös + todistusajo, skenaario keisari-kk-iphone-skenaario.txt) → PK. Sitten koealue-käännös.
- L2: PK palvelijat v2 8f87966d2 (pk-palvelijat-v2-l2.zsh, 20.05) → PK jalki taso1b ys cb7fde673 (pk-jalki-l2.zsh; juna 218 käyttää tausta-v115)
  → VS k6 8e0660847 (vs-k6-l2.zsh). Valmiista rivi tilaajalle (PK / VS).

## Viennit (vie-paketti.sh, ämpäri)
- KÄYNNISSÄ: LAV keltakatot-v1 (e01793511136, 1,4 Gt, tausta-v119 + rakennukset-v122 + c2-v37 + avoimet-v56, juna 219, PT kuitannut);
  loki julkaisija-tyokalut/vie-keltakatot-v1.log → valmis: rivi PK:lle (kytkee v119 saumat-219:ään) ja LAV:lle → sitten LAV:n pari 07 ennen/jälkeen
  + kattomediaani PT:lle ja LAV:lle (kun PK:n kytkentä-SHA tulee).
- Viety: KS esinekuvat isoisa-2029/esine 13 (19.37, kohtaamiset/piirroskartta/kartta-osat/), tausta-v117 (20.02), tausta-v118 (20.05).
  tausta-v116 EI (kansio jo 14.10:ltä eri sisällöllä; LAV versioi). Ämpärin olemassa olevaa ei ylikirjoiteta: tarkista curl ?t= -SHA, jos "oli jo".

## Muut
- PK-linja wt julkaisija-pk-218 = 2ca2f17b7 (lahipuut-v16, PT junalupa 218, ff).
- am-ketju 19.47: taso1b ja mp "VIKA kuvia ei syntynyt" (videot syntyivät) → PK:lle kerrottu.
- lahipuut-v16 parit 19.58 (PT katsoi OK). VS k5 editori 20.05 OK → VS.
