# Natiivi-UI:n luovutus 26.9.2026 (v), klo 22.5x

Jatkaa luovutusta (u) (id:t, simulaattori FB234D08 ja opit siellä). Luovutuksen (u) viisi viestiä on LÄHETETTY 22.4x.

## MERGE-PYYNNÖSSÄ (proto-git, kaikki puhtaasti juna/b13 0c271500 päälle, unity-tarkistus 0 virhettä, simulaattorissa todentamatta)
1. `natiivi-ui/kuvamerkit-174` @ **1857e8d5** (UUSI SHA, Natiivisepälle ilmoitettu 21479236 → päivitä): 174 Fablen säännöllä
   26.9. klo 22.4x: ei läikkää eikä himmennystä; kertoimesta 2,5 kuvamerkki webin koossa (taso 1 24/42/47, taso 2 22/30);
   kynnyksen alla PISTE (web minimerkki, omistaja 2.9.) paitsi vuori/meri/huuto(skandaali)/eläin(tassu)/ihme omalla
   viivamerkillä. Minikuvake poistettu. Työkopio wt/proto-natiivi-ui-nostot.
2. `natiivi-ui/maakunnat-kaikki` @ 0c9a3555: 169 + 170b + 173 (MaakunnatSilta.cs +3).
3. `natiivi-ui/nahtavyys-kevyt-178` @ c59320bb: löydös 178, kohteet[].tyyppi, aukio/luonto 0,72 + peitto 0,78. Odottaa web
   #3353:n mergeä ja Siirtosepän vientiä (tyyppi-kenttä pakettiin), sitten todennus. Työkopio wt/proto-natiivi-ui-sisallys.
4. `natiivi-ui/uusi-peli-177-ui` @ **43ee8146** (Pelikoodarin pelikoodari/uusi-peli-177 7a725447 päällä, mergetään yhdessä):
   UiNakymat.NollaaMuistit kuuntelee PeliOhjain.MuistitTyhjennetty: Karttaselite+Maakunnat, Matkalaukku tilastot, PuluChat
   (sukupolvi hylkää kesken olevan vastauksen), Saapumistraileri, Saapumisesitys, Lukijoilta.Unohda (Fable 22.4x: Keychain-
   avain pois kuten web). Kuvanäkymän nähdyt jäävät (web sessionStorage). Työkopio wt/proto-natiivi-ui-pariteetti.
5. `natiivi-ui/sisalto-vaihtui` @ 544e0ce3: Siirtosepällä (kääntää yhdessä omansa kanssa).

## ENSIMMÄISENÄ
- (Natiivisepälle uudet SHA:t 1857e8d5 / 43ee8146 LÄHETETTY 22.5x.) Tarkista merge-tila: git merge-base --is-ancestor <sha> juna/b13.
- Pelikoodarilta vastaus: Luennat.edellinen ei nollaudu Uusi pelissä; DeleteAll vie Natiivisepän/Linssisepän kehitysavaimet.

## AVOIMET
- Todennus simulaattorissa, kun käännösvuoro (käännökset erinä polton aikana): 174 kuvapari web vs natiivi, 177 Uusi peli
  (maakuntavalinta, chat, traileri alusta), 178 paketin jälkeen.
