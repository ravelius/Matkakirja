// TYYLIKIRJA — generoitu tiedostosta tyylikirja/tyylikirja.json (webin repo, node tools/tyylikirja.mjs --natiivi).
// ÄLÄ MUOKKAA KÄSIN. lähde 352090a691aa. Pohjat ja säännöt: docs/raportit/ui-pohjat-kartoitus-20261001.md.
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class Tyylikirja
    {
        public const string Lahde = "352090a691aa";

        public static class Kehys
        {
            public static readonly Color32 Bg = new Color32(29, 22, 16, 255);
            public static readonly Color32 Panel = new Color32(42, 31, 22, 255);
            public static readonly Color32 Panel2 = new Color32(53, 39, 26, 255);
            public static readonly Color32 Line = new Color32(75, 56, 38, 255);
            public static readonly Color32 InkLight = new Color32(243, 230, 208, 255);
            public static readonly Color32 Muted = new Color32(179, 156, 125, 255);
            public static readonly Color32 Accent = new Color32(217, 161, 59, 255);
            public static readonly Color32 AccentDark = new Color32(138, 97, 20, 255);
            public static readonly Color32 Kulta = new Color32(234, 184, 78, 255);
            public static readonly Color32 Danger = new Color32(255, 155, 138, 255);
            public static readonly Color32 RiviTausta = new Color32(53, 39, 26, 140);
            public static readonly Color32 OverlayCard = new Color32(46, 33, 20, 224);
            public static readonly Color32 OverlayLine = new Color32(217, 161, 59, 115);
            public static readonly Color32 Paper = new Color32(239, 220, 180, 255);
            public static readonly Color32 PaperDark = new Color32(220, 192, 143, 255);
            public static readonly Color32 MapInk = new Color32(70, 51, 31, 255);
            public static readonly Color32 MapInkSoft = new Color32(138, 108, 70, 255);
            public static readonly Color32 SeaInk = new Color32(110, 99, 80, 255);
            public static readonly Color32 Mark = new Color32(176, 58, 43, 255);
            public static readonly Color32 RajaMuste = new Color32(107, 85, 57, 255);
            public static readonly Color32 Kerma = new Color32(250, 244, 214, 255);
        }

        public sealed class Teema
        {
            public readonly string Nimi; public readonly Color32 Pinta, Muste, MustePehmea, Korostus, Reunus, Toiminto;
            public Teema(string n, Color32 p, Color32 m, Color32 mp, Color32 k, Color32 r, Color32 t) { Nimi = n; Pinta = p; Muste = m; MustePehmea = mp; Korostus = k; Reunus = r; Toiminto = t; }
        }

        public static readonly Teema Paperi = new Teema("paperi", new Color32(245, 240, 226, 255), new Color32(33, 29, 24, 255), new Color32(92, 74, 50, 255), new Color32(122, 85, 20, 255), new Color32(70, 51, 31, 77), new Color32(217, 161, 59, 255));
        public static readonly Teema Tumma = new Teema("tumma", new Color32(32, 26, 20, 255), new Color32(241, 230, 208, 255), new Color32(201, 180, 143, 255), new Color32(217, 161, 59, 255), new Color32(217, 161, 59, 97), new Color32(217, 161, 59, 255));
        public static readonly Teema Lasi = new Teema("lasi", new Color32(46, 33, 20, 224), new Color32(243, 230, 208, 255), new Color32(201, 180, 143, 255), new Color32(217, 161, 59, 255), new Color32(217, 161, 59, 115), new Color32(217, 161, 59, 255));
        public static readonly Teema LasiAvaruus = new Teema("lasi-avaruus", new Color32(4, 12, 9, 230), new Color32(223, 246, 232, 255), new Color32(159, 201, 176, 255), new Color32(93, 255, 168, 255), new Color32(93, 255, 168, 71), new Color32(93, 255, 168, 255));

        public static class Himmennys
        {
            public static readonly Color32 Tumma = new Color32(14, 9, 4, 184);
            public static readonly Color32 Kevyt = new Color32(14, 9, 4, 89);
            public static readonly Color32 Kuva = new Color32(14, 9, 4, 235);
        }

        public static class Tila
        {
            public static readonly Color32 Onnistuminen = new Color32(47, 107, 63, 255);
            public static readonly Color32 Virhe = new Color32(176, 58, 43, 255);
        }

        public static class Kentta
        {
            public const float Korkeus = 44f;
            public const float Alue = 88f;
            public const float Kulma = 10f;
            public const float ValiPysty = 8f;
            public const float ValiVaaka = 12f;
            public const float Koko = 16f;
            public static readonly Color32 Pinta = new Color32(245, 240, 226, 255);
            public static readonly Color32 Reunus = new Color32(70, 51, 31, 77);
            public static readonly Color32 Fokus = new Color32(217, 161, 59, 255);
            public static readonly Color32 Muste = new Color32(33, 29, 24, 255);
            public static readonly Color32 Vihje = new Color32(92, 74, 50, 255);
        }

        public static class Koko
        {
            public const float Kapiteeli = 12f;
            public const float Apuri = 14f;
            public const float Leipa = 16f;
            public const float Valiotsikko = 18f;
            public const float Otsikko = 21f;
            public const float Arkki = 26f;
            public const float Nimio = 34f;
            public const float LeveaLisa = 2f;
        }

        public static class Kirjain
        {
            public const Kirjasin Kapiteeli = Kirjasin.Kone;
            public const Kirjasin Apuri = Kirjasin.LukuKursiivi;
            public const Kirjasin Leipa = Kirjasin.Luku;
            public const Kirjasin Valiotsikko = Kirjasin.KoneLihava;
            public const Kirjasin Otsikko = Kirjasin.LukuLihava;
            public const Kirjasin Arkki = Kirjasin.LukuLihava;
            public const Kirjasin Nimio = Kirjasin.KoneBold;
        }

        public static class Vali
        {
            public const float Xs = 4f;
            public const float S = 8f;
            public const float M = 12f;
            public const float L = 16f;
            public const float Xl = 24f;
        }

        public static class Kulma
        {
            public const float Pieni = 6f;
            public const float Nappi = 10f;
            public const float Kortti = 12f;
            public const float Pilleri = 999f;
        }

        public static class Nappi
        {
            public const float Korkeus = 38f;
            public const float Osuma = 44f;
            public const float Laukaisin = 64f;
        }

        public static class Leveys
        {
            public const float Kapea = 600f;
            public const float Levea = 940f;
            public const float Kortti = 420f;
            public const float Minipopup = 320f;
            public const float Paneeli = 350f;
            public const float Sivukortti = 400f;
            public const float Lukupalsta = 640f;
            public const float Lehti = 960f;
        }

        public static class Peitto
        {
            public const float Max = 45f;
            public const float Ohjain = 25f;
            public const float Kamera = 20f;
            public const float Laajennettu = 85f;
            public const float Paneeli = 70f;
        }

        public static class Kuva
        {
            public const string HeroKortti = "2:1";
            public const string HeroArkki = "3:2";
            public const string Upotus = "4:3";
            public const float UpotusLeveys = 40f;
            public const float GalleriaKorkeus = 64f;
        }

        public static class Kesto
        {
            public const int Avaus = 220;
            public const int Sulku = 200;
            public const int Liuku = 240;
            public const int Maksimi = 250;
        }

        public static class Fontit
        {
            public static readonly (string Perhe, string Tyyli)[] Kone = { ("American Typewriter", "Regular"), ("Courier New", "Regular"), ("Courier", "Regular") };
            public static readonly (string Perhe, string Tyyli)[] KoneLihava = { ("American Typewriter", "Semibold"), ("American Typewriter", "Bold"), ("Courier New", "Bold") };
            public static readonly (string Perhe, string Tyyli)[] KoneBold = { ("American Typewriter", "Bold"), ("American Typewriter", "Semibold"), ("Courier New", "Bold") };
            public static readonly (string Perhe, string Tyyli)[] Luku = { ("Iowan Old Style", "Roman"), ("Iowan Old Style", "Regular"), ("Charter", "Roman"), ("Palatino", "Regular"), ("Georgia", "Regular") };
            public static readonly (string Perhe, string Tyyli)[] LukuLihava = { ("Iowan Old Style", "Bold"), ("Charter", "Bold"), ("Palatino", "Bold"), ("Georgia", "Bold") };
            public static readonly (string Perhe, string Tyyli)[] LukuKursiivi = { ("Iowan Old Style", "Italic"), ("Charter", "Italic"), ("Palatino", "Italic"), ("Georgia", "Italic") };
            public static readonly (string Perhe, string Tyyli)[] Kauno = { ("Snell Roundhand", "Regular"), ("Savoye LET", "Plain"), ("Bradley Hand", "Bold") };
        }

        public static readonly string[] Pohjat = { "NOSTOKORTTI", "LUKUARKKI", "KORTTI", "PANEELI", "KUVANÄKYMÄ", "LINSSIN OHJAIN", "PULU", "EDISTYMINEN", "KENTTÄ", "LAUTAPELI" };
    }
}
