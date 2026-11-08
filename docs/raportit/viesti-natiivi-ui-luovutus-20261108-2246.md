# Natiivi-UI: luovutus 8.11.2026 klo 22.46 (konteksti 26 %; lisäys luovutuksiin -2230, -2215 ja -2200)

Lue ENSIN -2230 (`git show bcaf9e117:docs/raportit/viesti-natiivi-ui-luovutus-20261108-2230.md`); se ja sen osoittamat -2215/-2200 ovat
yhä voimassa, paitsi alla muuttuneet. PT local_5df52e10-…, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KK local_37f7c945-….
Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa. Kaikki Mac-ajot on pyydetty JU:lta (send_message), järjestys: ipad70-2 → kameratappi-2 → nostokuvat.

## 1) iPad 70 % – ennallaan (-2230 kohta 1): sk-ipad70-2-mac.txt JU:n jonossa, sha 79351459b. Ei vielä ajettu 22.46.

## 2) KAMERATAPPI – korjattu, uusi ajo jonossa
- Ajo -1 iphone (lokit/nui-kameratappi-1-iphone-2d69ff27e) katsottu: tappi PIILOSSA koko ajon, "ei kaupunkinäkymä (piirros 0.00)".
  Syy: ehto PiirrosKerros.Nakyvyys on vain Pariisin karikatyyrikerros (näkyy vain ylhäältä katsottuna), ei kaupungin piirroslaatat.
- Korjaus 73498d875 (natiivi-backup natiivi-ui/kameratappi, worktree wt/proto-natiivi-ui-kameratappi): kaupunkinäkymä = kaupunkiportti
  (NostoSaannot.KaupunkiPortti(Sisaltokerrokset.NykyinenTaso, nakyy), taso ≥ 12 kuten kaupungin nostoilla). unity-tarkistus 0 virhettä.
- JU: -1:n loput (iphone-vaaka, ipad) peruttu; tilalle sk-kameratappi-2-iphone.txt (iphone + iphone-vaaka) ja sk-kameratappi-2-ipad.txt,
  lokit nui-kameratappi-2-{iphone,iphone-vaaka,ipad}-73498d875. Tarkista: "ui kameratappi tila" → "näkyy", kallistus kasvaa t-1:n jälkeen,
  suuntima t-2:n jälkeen; t-0 tappi himmeänä Pulun vasemmalla, ei päällekkäin (iPhone vaaka!) → pari PT:lle → KK.
  Jos tila sanoo "taso x < 12": skenaarion `aja … 0.017` ei avaa porttia → lisää zoomia tai tarkista NykyinenTaso.

## 3) UUSI, OMISTAJAN PYYNNÖT 22.32 (KK jakoi NUI:lle 1a, 1b, 2, 3; kuvaus
##    /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261108/2223-pyynnot.md + omistajan kuvat samassa kansiossa)
Haara natiivi-backup natiivi-ui/nosto-kuvat-koko = 10845cd24 (84a91d530 + bb0509e46 + 10845cd24), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-nostokuvat.
unity-tarkistus 0 virhettä, kielivahti ja pohjavahti ok.
- 3 KUVA KOKO RUUDULLE (Palais Garnier): Nahtavyysarkki.cs suurennos = Kuvasuurennos(juuri) { Tayteen, Kokoruutu, Raita } kuten nostokortissa
  (ennen pieni kuva valkoisessa paneelissa). Koskee palkin kuvan napautusta (Pinnaus → AvaaKuvat) ja arkin omia kuvia.
- 2 KUVATEKSTI kertojan isoille kuville (Luxembourg): SaapumisKuvat.LisaaKuvateksti = paperikaistale kuvan alla (rivi 1 Lyhyt, rivi 2
  Havainnekuva/lähde), Pulu.uss .mk-traileri__kuvateksti*. Käytössä: Saapumistraileri (aloituslennon/trailerin nousevat kuvat), SaapumisKuvat
  .Suurenna (kartan pieni kuva napautettuna; korvaa pelkän lähderivin) ja PulunKuvaNousee. EPÄVARMA: mikä polku omistajan Luxembourg-kuva oli
  (pyöreät kulmat 18 px = mk-traileri__kuva; ei Luentakuvasarja). Introesitys (C1–C5) EI saanut kuvatekstiä – tarkista Mac-kuvista/lokista
  "ui kuvateksti:" -rivit; jos Luxembourg tulee Introesityksestä, lisää sama kutsu sinne.
- 1a TARINA ISONA: Nostokortti.TarinaIsona (oletus päällä; `ui tarinaisona 0|1`): tarinanosto (Tarinanostot.On) → suoraan Vaihe2 + laajennettu,
  leveys Nahtavyysarkki.ArkinLeveys (iPad min(92 %, 860), puhelin min(90 %, 640)), leveällä keskelle (Pystypaikka alignItems Center).
- 1b LEHDEN TAITTO: Nostokortti.Lehtitaitto: ei kuvasarjaa ylhäällä; lohkot = ingressi + väliotsikon osiot, kuva i lohkoon i kylkikuvana
  (Lehtipalstat, teksti vieressä ja jatkuu alle), vuorotellen oikea/vasen (Lehtipalstat uusi kylkiVasen, vain yksi palsta), kuvan leveys
  min(45 %, 320 pt), kuvateksti alla, napautus suurentaa sarjan kohdasta i. Viimeinen keisari: 10 lohkoa / 10 kuvaa.
  AVOIN RISKI: kylkiVasen testattu vain käännöksellä; Lehtipalstat.Siirra voi siirtää seuraavan väliotsikon kuvan viereen, jos osion teksti
  loppuu kuvan vierelle (webin float-käytös) – katso j-2/j-3-kuvista.
- JU:n jonossa (sha 10845cd24, koot iphone + ipad): sk-nostokuvat-1-kuvateksti.txt, sk-nostokuvat-1-kokoruutu.txt, sk-nostokuvat-1-tarina.txt,
  lokit nui-nostokuvat-1-{kuvateksti,kokoruutu,tarina}-{iphone,ipad}-10845cd24. ENNEN-kuvat: omistajan 2223-1/2/3 ja tarina-ajon j-0 (`tarinaisona 0`).
  Katso kuvat itse → parit PT:lle → KK ("Kaikista Mac-kuvat iPhone- ja iPad-koossa KK:lle ennen junaa").

## 4) Sitten ★-kyltit (-2200:n SEURAAVA TEHTÄVÄ) ja LENTORAJA-6
- Lentoraja-6 viat (KK:n aloitus.md 22.06, ei omistajalle): pikselöitynyt laattapala ~0,1 s (s. 12,9), hyllyn pystysauma, valkoinen lovi
  reunassa (s. 13,1). Video lokit/nui-lentoraja-6-7bbea110d (kehykset lentoraja5/). Ei aloitettu.

## Käsitelty tässä istunnossa
- Postivahdin aloitusviesti (osoitti -2215:een; uudempi -2230 luettu ja noudatettu).
- 1c–1g ovat PK:n (1f päätetty kortilla 22.4x, ei NUI:n).
