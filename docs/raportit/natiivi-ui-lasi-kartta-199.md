# Natiivi-UI: peruskartalta lasi pois (juna 199)

Omistaja 17.10.2026 06.5x KK:n ja PT:n kautta: "Lasielementit kuuluvat vain linsseihin ja peleihin ei perus kartalle. Siellä vanha
seepian sävyinen pohja on oikea, älä muuta sitä." Proto-haara natiivi-ui/lasi-kartta-199 masterin (BUILD 198) päällä.

## Palautettu (a9b117e6b)
1. Äänet-paneeli: pois Lasipohja.Luokista ja kirkkaan taustan sävystä (junan 198 a4c257a4a, 7a67e3484 ja 9faf8ae4f:n Kehys.Panel2).
   Paneeli on taas vanhalla tummalla paneelipohjalla kuten ennen junaa 198. Tämä koskee myös linssejä, joissa Äänet ei ollut lasilla ennen junaa 198.
2. Nostokortin videopelimuunnelma (esim. Olavinlinna): sininen lasi pois (Nostokortti: Lasipohja.Kiinnita, nostokortti.uss:n
   läpinäkyvä toimintorivi). Kortti on omalla videopelipinnallaan. Lasikortin puolirivin leikkaus (e9a2852b4) ei enää laukea,
   koska se toimii vain lasin päällä.

## Palautettu erikseen (3e5557308) – PT voi jättää pois
3. Kartan ohjeteksti (Livian aloitusohje "Napauta kohteita kartalta…", Ylapalkki.LasiViesti) oli lasilla omistajan 15.10.
   16.33 päätöksellä (TF 193). Nyt se on uuden linjauksen mukaan tavallisena viestinä kartan pohjalla.

## Ei muutettu
- Pulun chat kartalla on jo paperia: lasi tulee vain linssissä (PuluChat.Linssissa). Junan 198 kuvaparin "P1" lasichat kartalla
  oli testikomento `ui chat teema lasi`, joka pakottaa linssiteeman.
- Lasi pysyy linsseissä ja peleissä: ISS, museo, aikajana, Ihmisen matka, ajattelijat, lentopeli, videopelien tummat kortit
  linsseissä ja vapaan lennon napit (LS 5252b59cb).

## Kuvapari
Skenaario sk-lasi-kartta-199.txt (Äänet, videopelikortti, Pulun chat) ajetaan sovelluksella lasipohja4-197-app (e9a2852b4 = 198-tila)
ja lasi-kartta-199-app. Arkit: lokit/todistus-lasi-kartta-{198,palautettu}-iphone-*.
