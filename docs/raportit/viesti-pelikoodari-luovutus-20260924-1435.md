# Pelikoodarin luovutus 24.9.2026 klo 14.35

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260923-natiivi5.md`. Tarkemmat merge-pyynnöt ja tilaukset
tältä vuorokaudelta ovat tiedostossa `/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md`
(viestiraja: Claude Desktop katkaisee lähetyksen 10 peräkkäisen session välisen viestin jälkeen, kunnes omistaja
kirjoittaa sessioon; niputa viestit, ja kirjoita tarvittaessa tiedostoon, josta Fable ja Natiiviseppä lukevat).

## Masterissa (proto-git) tämän session aikana
- B7 musiikki ja äänimaisema kokonaan: puhdas C# (Peli/Aani: AaniTila, Musiikkivalitsin, Maisemakori, Vaisto,
  AaniTaulut, Tehostetaulu, Kompressori = Chromiumin DynamicsCompressor-portti), Aanisoitin (omat klipit, pakattuna
  muistiin, yli 3 Mt striimattuna), koukut, MaisemaKompressori (OnAudioFilterRead), sanelun kova tauko, linssimusiikki.
  Kuulokoe: kohdat 1 ja 4 kuitattu (Laitetestaaja), kohta 3 = `koetila mannerlento` + mannerlennot NaytaRivit-kautta.
- Äänipiikki: `ui jatka` 75 ms → alle 16 ms (piikit3). Klipit `DownloadHandlerAudioClip.compressed = true`.
- Pakettivartija (`Peli-testit/vartija.sh`, `--hae`, `--koe`, `--raaka-kielletty`), tuotantokopio v20 (skeema 1.26).
  Lukijat päätasolla (skeema 1.30, 2.0 tunnettu); vartija vihreä: v20, v38, v38 raakakielto, 2.0 v4.
- Sanelu (SFSpeechRecognizer, Info.plist mukana), kuvanvalitsin (PHPicker), jakaminen, Keychain (MatkakirjaAvaimet),
  lukijaääni (Puhe.Persoonat/Nopeus/Voima; nopeus 1,15 ja voima 2,0 webin mukaan), kulkutavat (Vaihda, Liiku),
  linssiportti, lentokaaret, UGUI-pisteskaala iPadilla, avaus-introon, App Store -rajaus peli-komento.txt:lle.

## Merge-jonossa (Natiiviseppä)
- `pelikoodari/aloituskaava-web` 2c41219 (build 8; tulee myös `natiivi-ui/iphone-island` a96c574:n mukana):
  intro portilla (`PeliOhjain.SoitaIntro()`, Natiivi-UI kutsuu), valinta katkaisee intron (OhitaLuento), koneen
  lähtiessä `lento-alku` + moottori joka avauslennolla (`Luennat.LentoAlkuAvaukseen`), testikomento `luento lento-alku`.
- `pelikoodari/kehittajakoodi-keychain` f05ec87: lukijaäänen kehittäjäkoodi vain `Asetukset.PolloKoodi`sta (Keychain),
  vanhat PlayerPrefs-avaimet poistetaan. Pohja (natiivi-ui/nostomerkit) on jo masterissa.
- `pelikoodari/siirrot-kartalle` 4b68c8c: nopan jälkeen EI listakorttia (web vaihe 'move'): `SiirtoKohteetMuuttui`,
  `ValitseSiirto`, `ValintavihjeAika/Pois` (15 000 ms). Tilaukset lähetetty: Natiiviseppä renkaat, Natiivi-UI pöllön
  vihje + Peruuta-piilotuksen poisto. Fablen aiempi "siirtolista ei sulkeudu" -päätös on tällä vanhentunut (webissä ei listaa).
- Napakalottien WebP-purku MatkakirjaKuvat.mm:ään (natiiviseppa/napakalotit): hyväksytty.

## Web-PR:t (Julkaisija)
- Auki: #3038 pariteettikuvat.mjs (44 näkymää, DOM-todennus, 88 kuvaa `proto-3d/lokit/pariteetti-web-2026-09-24/`),
  #3057 avausluentojen aikaleimat (tiedostot jo ämpärissä, ?v=2 → 200), #2997 sähkekorjaukset, #2990 yöportti,
  #2982 vartijan karsinta, #2898 äänten lisenssiportti. #2932 on Siirtosepän (lisenssitarkistus).
- Mergetty: #3003, #3014, #3024, #3046 (fi.matkakirja.peli natiiveihin → chatin 403 korjattu), #2985.
- Siirtoseppä: `siirtoseppa-avausluennat` (avausluentojen teksti + aikaleimat pakettiin) PR:nä #3057:n jälkeen.

## Avoimet ja seuraavaksi
- Pariteettierot Laitetestaajalta: noppa-siirtolista (korjaus merge-jonossa), maalehti-aihe1:n kuvateksti (Natiivi-UI),
  keksinnöt-linssin muotokuvakortti ja filminauha (Linssiseppä, lähettämättä, ks. lokitiedosto).
- Topografialinssin web-savuke 52/54 (2 uutta punaista, ei estä mergejä): omistaja epäselvä, ei aloitettu.
- `wt/pelikoodari-vanha-checkout`: yksi commitoimaton muutos, ei kosketa.
- Muisti: `pelikoodari-tila-20260924-b7.md`.
