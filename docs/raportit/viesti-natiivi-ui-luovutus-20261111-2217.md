# Natiivi-UI: luovutus 11.11.2026 klo 22.17 (kontekstivahti 27 %; jatkaa -2155:tä c91efb27b)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Lue ensin -2155 (git show c91efb27b:docs/raportit/viesti-natiivi-ui-luovutus-20261111-2155.md): worktreet, työkalut rajaa.py/arkki.py, JU:n jono.
rajaa.py: SAMAN numeron toinen traileri (esim. Lontoo b-kuvat) vaatii VALI=1 (oletus ottaa Pariisin rivin).

## TEHTY 21.55–22.17
1. intro-nimet-4 (12492f694) KATSOTTU: a1/a1b ok (Eiffelin nimi näkyy kirjainten poistuessa). Ei lähetetty erikseen.
2. intro-nimet-5 (165addc72) KATSOTTU + KK:lle 22.1x: Lontoo 8,74 s (oli 4,56), kuvat 1–2 rivi ei piiloon, kuva 3 piiloon 0,58 s paluussa;
   luennan väli ~2,1 s (puheen ulostulo seisoi 2,0 s, puhejärjestelmän viive). Rajaukset lokit/nui-intro-nimet-5-165addc72/kk/.
   b2b: katedraalin nimi tummana (häivytyksen aikana otettu). ODOTTAA KK:n sanaa → PT:lle "JUNAAN 165addc72 (intro-nimet-kortti)" + taitto.
3. D AARREKYSYMYS TOTEUTETTU 79f883671 (natiivi-backup natiivi-ui/aarrekysymys, worktree /Users/Shared/Claude/wt/nui-aarre, juna-224 c4b6179cf päällä;
   unity-tarkistus 0, Peli-testit 926/926). PeliOhjain.Aarrekysymys.cs + UI/Aarrekysymys.cs; Perilla → KysyAarre ennen saapumisketjua,
   PerillaKaupunkiin = vanha loppu; rasti = RastiPerilla (MatkaPerilla(null) + Kartalle; vaihe Toiminta → ei heittonappia, PT:lle vahvistettu).
   Napautus ohitetussa kaupungissa → kysymys takaisin. Automaattiajo (Testiajo.Komennoilla/editori) vastaa itse oikein. Komennot
   `ui aarrekysymys kysy|automaatti|oikein|rasti|nayta|tila`. NS: ei muutoksia (rasti perii jonon, välimuisti jää).
   Ajo JU:lla jonon lopussa (vakioajon jälkeen): sk-aarrekysymys-1.txt → lokit/nui-aarrekysymys-1-79f883671 (b-rasti, a-oikein, c-liiku).
   KATSO: b1 kysymys nappulan alla, b3 ei noppaa, b5 nosto, b6 kysymys takaisin, b7/a2 zoomaus (loki "lähinäkymä valmis|KESKEN"), c1 uudelleen, c3 liiku.
   Avoimet KK:lle: aloituskaupunkiin PALATESSA kysytään (kaikissa kaupungeissa laatta; vain aloituslento ohitetaan); tumman kartan ja alareunan
   rajaukset puuttuvat skriptistä. Junaan vasta KK:n sanalla + PT pt-ok.
4. PT:n lähdekorjaus 024407e83 (natiivi-ui/lahde-lontoo, worktree /Users/Shared/Claude/wt/nui-lahde): JU vie junaan 224.86 (MR81). VALMIS.

## JU:N JONO (järjestys)
taitto-1 (ec3aaa575) → petit-palais-5 (a0c49d779) → vakioajo (210c842ad) → aarrekysymys-1 (79f883671). Ohjeet: -2155 kohdat 3–5 ja yllä.

## SEURAAVA
KK:n vastaus intro-nimet-5:een → taitto-1 katso → petit-palais-5 → vakioajon PUUTE-rivit → aarrekysymys-1 katso → KK.
