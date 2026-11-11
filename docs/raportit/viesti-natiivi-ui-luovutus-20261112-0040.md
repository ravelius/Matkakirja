# Natiivi-UI: luovutus 12.11.2026 klo 00.40 (kontekstivahti 28 %; jatkaa -0022:ta ac593c08a)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f. Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-*.txt; ajot lokit/nui-*;
tarkistus `sh Peli-testit/unity-tarkistus.sh </dev/null`. KK 22.54: esittelyn 3D-tähteä EI piiloteta.
Worktreet kuten -0022:ssa (nui-aarre, nui-pariisi, nui-pariisi-data, nui-vakio, tämä nui-luovutus-2115).

## A. AARREKYSYMYS (KK 00.25: kaksi korjausta ennen junaa)
- 1) noppa pois kysymyksen ponnahtaessa: TEHTY 0c6b366ea (natiivi-backup natiivi-ui/aarrekysymys; PeliNakymat.AarreNoppaPois NaytaAarrekysymys-kohdassa,
  myös napautuksesta; noppa on PickingMode.Ignore). Lisäksi Nappula.Tila() kertoo usvan, _Nakyvyys, koon, jonon, väistön (vain loki).
- 2) c3 nappula puuttuu Pariisista Liiku-valinnassa: SYY AUKI. Havainto: Ranskan tasolla Pariisissa varsinainen nappula ei näy koskaan (ei myöskään
  kysymyksen aikana eikä vanhassa natiiviseppa-liiku-ehdokkaat-ajossa 7.11.); vapaalla kartalla näkyvä nappula on KaupunkiPallot.NappulaYlla-kopio
  (piirtyy, kun kuumailmapallo osuu nappulaan). Liiku piilottaa pallot (KohdettaValitaan) → kopio pois → ei nappulaa. NappulaYlla vaatii
  RuutuVaisto.NappulaNakyy (usva ≥ 0,5), joten usva ei luultavasti ole syy; jono Transparent+70 > piirros +57. Seuraava epäilty: mikä peittää
  3D-nappulan kaupungin kohdalla (vaalea kaupunkilaikku) tai koko/ankkuri. Nappula.cs on Natiivisepän alaa → jos syy siellä, rivi NS:lle/KK:lle.
- Mac-ajo sk-aarrekysymys-3.txt JU:n jonossa → lokit/nui-aarrekysymys-3-0c6b366ea. KATSO: b1/a1/b6/c1 ei noppaa; "komento nappula tila" -rivit
  c2, c3 ja b9 (b9 = tavallinen kulku: oikein-merkin + zoomauksen jälkeen Liiku Pariisissa). Näyttö KK:lle: b1, a1, c3 täysikokoisina → junasana.

## B. PARIISIN TEKSTIVERSIO (KK 00.36: kortti hyväksytty, Pulun osuus ei vielä junaan)
- -1 (42e9c0559) katsottu: teksti + kyyhkykuva taitettuna ok, pallokuva pyöreä ok. Pulu aloitti heti, koska vanha luentaääni "loppui" heti (Macin ulostulo).
- KK:lle 00.4x selitetty: Pulun vuoro odottaa isoisän ÄÄNEN loppua (PuheMuuttui → LuentoLoppui → 0,9 s). AVOIN KYSYMYS KK:lle: kertoja pois →
  Pulu alkaa kirjoituksen aikana; korjataanko odottamaan kirjoituksen loppua? Kupla: kuplaton omistajan päätöksellä 6.10. (KK päättää muutoksesta).
  Pieni kuva: kehittäjätilassa jo kartalla (ei vika). Lisenssirivi Pulun kuvassa ei näy ("kertojan kuva, ei kuvatekstiä"): KYSYTTY KK:lta, ODOTTAA.
- UUSI KOODI ce3e22c43 (natiivi-backup natiivi-ui/pariisi-tekstit) = 42e9c0559 + testikomento `ui luennat juuri file:///…/kokoelmat/` (isoisän v3-luennat
  viennistä). Mac-ajo sk-pariisi-tekstit-2.txt JU:n jonossa aarrekysymys-3:n jälkeen → lokit/nui-pariisi-tekstit-2-ce3e22c43. KATSO: isoisän ääni
  isoisa-pariisi.mp3 soi loppuun ENNEN pallokuvaa; puhe-rivi pulu-pariisi-3.mp3; pallokuva Pulun puheen aikana. Tulokset KK:lle → junasana.
- Junaan KK:n sanalla: koodi (ce3e22c43 tai sen päälle) + SK-haara ja data cb990dca6 mainiin + sisällön vienti (PT/JU) + PT pt-ok.

## C. vakioajon uusinta (Lontoo + vakiokuvat): ei vielä ajettu; JU:n jonossa -0022:n mukaan → PUUTE-rivit katsotaan.

## LISÄYS 00.5x (KK 00.39 ja 00.40)
- KK:N PÄÄTÖKSET: kupla pysyy pois (omistaja 6.10.), t5 kelpaa. LÄHDERIVI KYLLÄ. Kertoja pois: Pulu odottaa kirjoituksen. → TEHTY d529f965a
  (natiivi-backup natiivi-ui/pariisi-tekstit): lähderivi pyöreän Pulun kuvan alle (loki "Pulun kuvan lähderivi"); Saapumisesitys.KirjoitusJaJatko
  (Matkakirjakortti.KunKirjoitettu, varakello +3 s; loki "ilman luentaa, Pulun vuoro kirjoituksen jälkeen"). unity-tarkistus 0.
- pariisi-tekstit-2 vaihdettu d529f965a:han → lokit/nui-pariisi-tekstit-2-d529f965a (ei -ce3e22c43). JU:lle: Macin äänen ulostulon pitää soida
  ennen ajoa (KK:n ehto: junasana vasta ajosta, jossa luenta soi loppuun ja Pulu puhuu). KATSO lisäksi p2 lähderivi täysikokoisena → KK.
- AVOIN: poikkeuksen (kertoja pois) lokijärjestys "taitettu teksti kirjoitettu" → "ilman luentaa, Pulun vuoro kirjoituksen jälkeen" → "Pulun kuva nousee"
  näytettävä seuraavassa sopivassa ajossa (kertoja pois -kytkin skenaarioon). Junasana KK:lta, kun molemmat nähty.
