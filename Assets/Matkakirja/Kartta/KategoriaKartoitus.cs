namespace Matkakirja
{
    /// <summary>
    /// 3D-NOSTOJEN KATEGORIASYMBOLIT (omistajan korjaus 26.9.2026 klo 21.5x, sitova; esitys
    /// docs/raportit/arkkityypit-paletti-animaatio-20260926.md §2 ja §4): 3D-nostot ovat NOSTOT-paneelin kategoriasymbolit
    /// kolmiulotteisina reliefeinä (samat joka maassa), eivät rakennusarkkityyppejä, eivätkä ne liiku. Järjestys =
    /// mallitaulukon indeksi (Symbolimallit.Kategoriat.cs). Muoto on nimessä, paneelin rivi kommentissa.
    /// </summary>
    public enum Kategoriasymboli
    {
        /// <summary>Historia: raunioitunut kaari (merkki-historia.png).</summary>
        Kaari,
        /// <summary>Kadonneet ihmeet: tähti (paneelissa kompassiruusu).</summary>
        Tahti,
        /// <summary>Historian hetket: tiimalasi (merkki-hetki.png).</summary>
        Tiimalasi,
        /// <summary>Skandaalit: salama (merkki-huuto.png).</summary>
        Salama,
        /// <summary>Luonto: vuori (merkki-vuori.png).</summary>
        Vuori,
        /// <summary>Luonto: tulivuori (katkaistu kartio ja kraatteri).</summary>
        Tulivuori,
        /// <summary>Luonto: vesi, eli meri, joki, järvi ja saari (kaksi aaltoa).</summary>
        Aallot,
        /// <summary>Eläimet: tassu (merkki-elain.png).</summary>
        Tassu,
        /// <summary>Kulttuuri: kellotorni (merkki-kulttuuri.png).</summary>
        Kellotorni,
        /// <summary>Ruoka: malja ja leipä (merkki-ruoka.png).</summary>
        Malja,
        /// <summary>Kauppa: vaaka (merkki-kauppa.png).</summary>
        Vaaka,
        /// <summary>Tekniikka: ratas (merkki-tekniikka.png).</summary>
        Ratas,
        /// <summary>Merenkulku: ankkuri (merkki-merenkulku.png).</summary>
        Ankkuri,
        /// <summary>Kaupungit: piste (matala kiekko).</summary>
        Kiekko,
    }

    /// <summary>
    /// NOSTO → KATEGORIASYMBOLI puhtaana funktiona (ilman UnityEngineä; Kartta-testit/KategoriaKartoitusTestit). Sama
    /// valinta kuin 2D-kartalla ja NOSTOT-paneelissa:
    ///   1) laji tulivuori → Tulivuori (kuvamerkkiä ei vielä ole, joten muuten tulivuori putoaisi pois);
    ///   2) kuvamerkin tiedosto NostoSaannot.Kuvamerkki(kategoria, laji) (laji ensin, sitten kategoria; luonto ilman lajia
    ///      → vuori) → symboli: historia → Kaari, vuori → Vuori, meri/joki/järvi/saari → Aallot, kulttuuri → Kellotorni,
    ///      ruoka → Malja, kauppa → Vaaka, tekniikka → Ratas, merenkulku → Ankkuri, huuto → Salama, eläin → Tassu,
    ///      hetki → Tiimalasi;
    ///   3) kuvamerkittömät paneelin rivit kategoriasta: ihme → Tahti (paneelin kompassiruusu), kaupunki (kategoria tai
    ///      laji) → Kiekko;
    ///   4) muuten null (malli jää arkkityypiksi).
    /// </summary>
    public static class KategoriaKartoitus
    {
        public const int Lukumaara = (int)Kategoriasymboli.Kiekko + 1;

        public static Kategoriasymboli? Symboli(string kategoria, string laji)
        {
            if (laji == "tulivuori") return Kategoriasymboli.Tulivuori;
            switch (NostoSaannot.Kuvamerkki(kategoria, laji))
            {
                case "merkki-historia.png": return Kategoriasymboli.Kaari;
                case "merkki-vuori.png": return Kategoriasymboli.Vuori;
                case "merkki-meri.png":
                case "merkki-joki.png":
                case "merkki-jarvi.png":
                case "merkki-saari.png": return Kategoriasymboli.Aallot;
                case "merkki-kulttuuri.png": return Kategoriasymboli.Kellotorni;
                case "merkki-ruoka.png": return Kategoriasymboli.Malja;
                case "merkki-kauppa.png": return Kategoriasymboli.Vaaka;
                case "merkki-tekniikka.png": return Kategoriasymboli.Ratas;
                case "merkki-merenkulku.png": return Kategoriasymboli.Ankkuri;
                case "merkki-huuto.png": return Kategoriasymboli.Salama;
                case "merkki-elain.png": return Kategoriasymboli.Tassu;
                case "merkki-hetki.png": return Kategoriasymboli.Tiimalasi;
            }
            if (kategoria == "ihme") return Kategoriasymboli.Tahti;
            if (kategoria == "kaupunki" || laji == "kaupunki") return Kategoriasymboli.Kiekko;
            return null;
        }
    }
}
