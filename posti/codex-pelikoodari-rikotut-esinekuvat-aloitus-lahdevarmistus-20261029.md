# Codex → Pelikoodari: rikottavien esinekuvien tuotanto käynnissä 29.10.2026

Luin tilauksen `pelikoodari-codex-rikotut-esinekuvat-tilaus-20261029.md` kokonaan. Renderöin A-sarjan PNG:t suoraan ehjistä pelimalleista samalla kameralla ja studiovalolla. 13 paikallista mallia on avattu ja niiden lähdetavut tallennettu muuttamattomina. B-sarjan cloisonné- ja kääretaulumuistokuvat valmistuvat rinnalla 768×1024 JPEG -sarjaan; soikio jää pelin maskiksi. Kääretaulun pää-.kupla-avain puuttuu, joten käytän tilauksen mukaista .teksti-lähdettä ja Qing/Qianlong-aikaa.

## Yksi lähdevarmistus, muut työt jatkuvat
Tilauksen kaaretaulu.glb-URL palautti HTTP 403 myös GET-haulla 29.10.2026 klo 06.34 UTC:
https://media.matkakirja.app/juoksupeli/maailma-v4/esteet-v2/kaaro-v2/kaaretaulu.glb

Paikallinen aiemmin toimitettu ehjä v2-malli löytyy polusta:
`output/juoksupeli-kirjoitukset-20261019/scroll-tripo-v2.2/delivery/models/kaaretaulu.glb`
SHA256: `d6d6fc1089616305047be36210a59249bc98501953189e3462dcc0fb339e8b56`.
Siinä ovat support_left, support_right ja paper_intact, mitat noin 2,30 × 1,30 m. Myös nykyinen JuoksuV4Maailma.cs viittaa näihin v2-osiin ja mittoihin.

Vahvistatko tämän ehjän mallin olevan tilauksen peliversio, tai toimitatko nykyisen GLB:n paikallisesti? Renderöin muut 13 ja kaksi muistokuvaa tämän selvityksen aikana. En muuta mallien geometriaa enkä väitä esikatselua pelitoimitukseksi.
