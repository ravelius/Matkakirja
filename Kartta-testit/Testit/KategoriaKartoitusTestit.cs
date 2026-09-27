// 3D-NOSTOJEN KATEGORIASYMBOLIT (omistaja 26.9.2026 klo 21.5x): nosto → NOSTOT-paneelin kategoriasymboli
// (KategoriaKartoitus) samalla valinnalla kuin 2D-kuvamerkki (NostoSaannot.Kuvamerkki: laji ensin, sitten kategoria).
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class KategoriaKartoitusTestit
    {
        static Kategoriasymboli? S(string kategoria, string laji) => KategoriaKartoitus.Symboli(kategoria, laji);

        [Testi]
        static void KuvamerkinMukaan()
        {
            Oleta.Sama(Kategoriasymboli.Kaari, S("historia", null), "historia");
            Oleta.Sama(Kategoriasymboli.Kaari, S("historia", "historia"), "historia/historia");
            Oleta.Sama(Kategoriasymboli.Vuori, S("luonto", "vuori"), "vuori");
            Oleta.Sama(Kategoriasymboli.Vuori, S("luonto", null), "luonto ilman lajia → vuori (Kuvamerkin vara)");
            Oleta.Sama(Kategoriasymboli.Aallot, S("luonto", "meri"), "meri");
            Oleta.Sama(Kategoriasymboli.Aallot, S("luonto", "saari"), "saari");
            Oleta.Sama(Kategoriasymboli.Ankkuri, S("kauppa", "merenkulku"), "laji ennen kategoriaa");
            Oleta.Sama(Kategoriasymboli.Vaaka, S("kauppa", null), "kauppa");
            Oleta.Sama(Kategoriasymboli.Salama, S("huuto", null), "skandaali");
            Oleta.Sama(Kategoriasymboli.Tassu, S("elain", null), "eläin");
            Oleta.Sama(Kategoriasymboli.Tiimalasi, S("hetki", null), "hetki");
            Oleta.Sama(Kategoriasymboli.Malja, S("kulttuuri", "ruoka"), "ruoka");
        }

        [Testi]
        static void KuvamerkittomatRivit()
        {
            Oleta.Sama(Kategoriasymboli.Tulivuori, S("luonto", "tulivuori"), "tulivuori");
            Oleta.Sama(Kategoriasymboli.Tahti, S("ihme", null), "ihme");
            Oleta.Sama(Kategoriasymboli.Kiekko, S("kaupunki", null), "kaupunki");
            Oleta.Sama((Kategoriasymboli?)null, S("urheilu", null), "ei paneelin symbolia");
            Oleta.Sama((Kategoriasymboli?)null, S(null, null), "ei tietoa");
            Oleta.Sama(14, KategoriaKartoitus.Lukumaara, "14 symbolia");
        }
    }
}
