# Julkaisija: luovutus 5.11.2026 klo 23.47

Rooli: Julkaisija (JU). Korvaa -2152:n ALOITA-osan. Voimassa: -2152:n TAPA, JUNA 219 ja OPIT (haara julkaisija-luovutus-2152), -1906:n TAPA ja -1812:n SITOVAT LINJAT, VIRHEET ja OPIT (haarat julkaisija-luovutus-1906, julkaisija-luovutus-20261105-1812). T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt.

## ALOITA TÄSTÄ
1. Tilanne 23.55: jono tyhjä, L1 ja L2 vapaat, JU:n omia taustaajoja ei kesken. Valovahti pid 90769 käynnissä. PT:lle lähetetty "JONO TYHJÄ".
2. Käynnistä lukkovahti Monitorina (zsh T/lukkovahti.zsh, 30 min, käynnistä uudelleen päättyessä).
3. KK 23.38: nähtävyyssarja (KS, VS) etusijalla, muut (NS:n talot) vasta sen jälkeen tai vapaalle linjalle, jos sarjalle jää linja. Sarjan ajoista tulee tiheästi pyyntöjä.
4. Käännösvirhe kuluttaa saman vuoron: KS 6f5229e61 kaatui 23.46, korjattu 76b9b0c38 ajettu samalla vuorolla (kirjattu).

## JUNA 219
Ei muutosta -2152:sta: junarunko julkaisija/runko-219-muisti = 7bbf04e09, ei käännetty; ei TF:ää ennen kuin Pariisi on valmis. Mikään tämän vuoron ajoista ei ole junassa.

## PIENI iPAD
PT kysyi 22.3x. Vastasin: 9e8c8ab1e:n jälkeen KS:n haarassa uudet Grand Palais, Riemukaari 24g ja 24p, Panthéon, Opéra, Invalidit; asennusta ei jonossa, koska omistaja 19.26: pieni iPad kotona, ei asennusta (ei päättymisehtoa; "kun Pariisi valmis" koskee TF:ää). Työlistan rivi "Pieni iPad päivittyy..." ei vastaa tätä; se ei ole JU:n rivi. Työlistamuistutuksen muut rivit eivät ole JU:n.

## AJETTU 21.55–23.45 (jonolokissa kesto ja kuvat)
VS 9bb7dabd7, f2c1e8017, a48428884 (2 kertaa), 7da270ac5, 9cb6435e4. KS fbb5ba2e3, 93d41db55, 1df82634d. PK 7293ed891 sk-r, 35140432d sk-s. LAV 25b, 25c, 25d. NS 1a03b85fc, 30e34cc9e, 388742104 (kolme ajoa). NUI 71da09e11 (kaksi ajoa), 37554f678. Kuvia en katsonut: tekijät tarkistavat itse.
Palautetut: KS 12 kuvaa (tuli takaisin 5:llä), NS 37fa268e4 17 kuvaa (NS perui, tilalle 388742104), VS a48428884-uusinta 6 turhaa kuvaa samalla sha:lla (tuli 0 kuvalla).
PUUTE-rivit kerrottu tekijöille: NS Marais 1a03b85fc "talot: luotu" (NS: väärä hälytys), NS esityskuva 388742104 "saapuminen: esitys nykyintro pariisi pois" (NS tarkistaa).

## VIRHEET JA OPIT
- Lukkojen polut: L1 /tmp/matkakirja-kaannospalvelu.lukko/kuka, L2 /tmp/matkakirja-kaannospalvelu-2.lukko/kuka. Tarkistin ensin väärät polut (kaannospalvelu1 ja 2), ja vuoro oli jo kirjattu jonolokiin. Korjasin ennen vuoroviestiä. Katso polku T/lukkovahti.zsh:stä.
- Roolien sha:t eivät näy tässä kotikansiossa: käytä git -C /Users/Shared/Claude/wt/julkaisija-ns-gc. Skenaario on proto-3d/_tyo/<rooli>/.
- Kuvien lasku: grep -cE '^kuva(3d)? ' (LAV:lla kuva3d; pelkkä '^kuva ' antaa 0).
- esikatselu.sh päättyy exit 1 "VIKA kuvia ei syntynyt", jos skenaariossa on vain tallenteita (rivi 155), vaikka ajo onnistui. Pyydettäessä ajoa ilman kuvia kerro tämä tekijälle; mac-ajo.zsh kirjaisi sen VIKAksi.
- Roolien kärki vaihtuu usein pyynnön jälkeen (KS neljä kertaa ennen ajoa). Vuoroviestissä: "aja uusin ja kerro sha" säästää yhden kierroksen.
- PK:n peruutus ja kumous menivät ristiin: kirjaa kumottu peruutus jonolokiin, ja anna linjan olla varattuna, kunnes lukko kertoo.
- zsh: glob-ehdot (/) ja `echo ======` kaatavat komennon tässä kuoressa; ls | while toimii.
