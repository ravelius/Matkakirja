# PT:n luovutus 11.11.2026 klo 13.4x (konteksti 30 %)

Korvaa -1117:n juna-, rooli- ja muut-kohdat. Pt-ok-tiedostot: /Users/Shared/Claude/julkaisija-tyokalut/linkki-224-uutta/.

## Omistajan päätökset tänään iltapäivällä (kaikki mainissa)
- 12.15 ison iPadin juoksupeliajot seis (PR 6574). 12.20 juoksupelin vanhaa koodia ei mitata eikä nopeuteta (PR 6575). 12.21–12.22 isolla iPadilla vain KK:n nimeämä valmis kokonaisuus (Raamattu 12.26.5, PR 6576). 12.18 Turisti-info Lehden sisälle, nappi pois kartalta (KK, aamun päätös voimassa).

## Juna 224
- Linkissä 224.67 (fe1620cf0, 13.19). JU:n jono: 224.68 KS SC 613f55c18 + talot v15, 224.69 NUI pallo 27ef4dd78, 224.70 VS kynä v4 ea0bee3ce, 224.71 NS 367ea7f0a (turha varjotyö + kytkimet; KK 13.0x junaan), 224.72 VS pilvet 51e33fb4f (Mac-todiste), 224.73 KS Petit Palais b8d7c913e + talot v16 (KK 13.44).
- Peruttu: NUI b83baccaf (224.71.*.peruttu-KK-1219). Vanhat 224.72-tiedostot = siirretty-224.71.
- KK:n iPad-erä ennen versiota: lista linkki-224-uutta/ipad-era-224.txt (syvyysveto Metal, muistihuippu, yläpalkki/Lehti, pilvet, NS-varjot). Lähtölupa vain KK:lta; PT pitää listaa (lisää Petit Palais/talot v16 muistiin).
- Odottaa pt-ok:ta: NUI junakokonaisuus 48532e3fa (UI hyväksytty 49d03f79f) → vasta kun KK katsonut lähin-kuvat (nui-lahin-1, JU). PK v133c a0eaa2d8b → vasta kun PT katsonut uudet ovikuvat aukiolta + v132-pari (LAV: ovi rakennusten välisellä reunuksella → jos totta, ovenhaun vika, korjattava). Tarkastelukuvien tyhjä aukio = kamera rakennuksen sisällä; harjakoristeet eivät häivy kattojen mukana (löydös E:n sukua, ei nyt).

## Roolit
- KK: juoksupelin tavoiterakenne (suunnitelmat/20261111-juoksupeli-tavoiterakenne.md, 9 palaa); juoksupelin töitä ei jaeta palalistan ohi. Saumat ja mäet -suunnitelma (20261111-saumat-ja-maet.md).
- NS: latausvika 31f66a2c3 (latausjono-moduuli + näkyvä virhe), seuraavaksi Mac-todiste 5/5 täydellä mallimäärällä → KK. Koskee vain juoksupeliä. Sitten saapuminen (204a54ecd, mac-7 JU:lla), sitten PiirrosKerros.Purku-selvitys (KK 13.15, ensin selvitys).
- PK: nollautuu (luovutus 586e6bdf6). 1. ovikuvat v133c; kameralaite pala 1 7355d8ab3 KK:n hyväksymä testimuutoksin, pala 2 välitila 5be43897b (A–E KK:lla); rivi "Kohdekartta: kuvahaut ilman kattoa" (NS:n löydös, ensin toisto Macilla).
- LAV: leivonta v5 v133c-lähteellä, pala 3 tehtävänanto KK:lta tulossa.
- KS: pallo KJ37 korjaukset (hiekkakenttä kartan sävyyn, vanha varjo pois), Montmartren tarkempi maasto (RGE ALTI; EI junaan ennen omistajan korttia), Grand Palais. Overture ei käyttöön (621b77e8d).
- NUI: juna-lehti lähin-kuvat KK:lle; rivi pallon kyltti £200 (ei kiire).
- VS: maa A SEIS (piirroskerros pois pelissä); saumat ja mäet: rinnevarjon häivytys, sitten A-koe laattojen varjostimeen.
- JU: lukkovahti käytössä (pysäytettyjen ajojen lukot). NUI ajoi 12.26 pkill unity-tarkistus.sh (kaikille ilmoitettu).

## Levy
- 85 Gi vapaana 12.29 (NAS-siirrot: lokit-20261111, 176 kansiota + jako-vanhat). Fable-checkoutin git-pakkaus 11.58 (5,9 G, valmis).
