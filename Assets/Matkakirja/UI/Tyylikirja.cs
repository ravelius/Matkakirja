// TYYLIKIRJA — generoitu tiedostosta tyylikirja/tyylikirja.json (webin repo, node tools/tyylikirja.mjs --natiivi).
// ÄLÄ MUOKKAA KÄSIN. lähde ee238ad2ea83. Pohjat ja säännöt: docs/raportit/ui-pohjat-kartoitus-20261001.md.
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class Tyylikirja
    {
        public const string Lahde = "ee238ad2ea83";

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
            public static readonly Color32 KultaKuulto = new Color32(234, 184, 78, 102);
            public static readonly Color32 Danger = new Color32(255, 155, 138, 255);
            public static readonly Color32 RiviTausta = new Color32(53, 39, 26, 140);
            public static readonly Color32 OverlayCard = new Color32(46, 33, 20, 224);
            public static readonly Color32 OverlayLine = new Color32(217, 161, 59, 115);
            public static readonly Color32 Lapinakyva = new Color32(0, 0, 0, 0);
            public static readonly Color32 MapInk04 = new Color32(70, 51, 31, 10);
            public static readonly Color32 MapInk06 = new Color32(70, 51, 31, 15);
            public static readonly Color32 MapInk07 = new Color32(70, 51, 31, 18);
            public static readonly Color32 MapInk08 = new Color32(70, 51, 31, 20);
            public static readonly Color32 MapInk10 = new Color32(70, 51, 31, 26);
            public static readonly Color32 MapInk12 = new Color32(70, 51, 31, 31);
            public static readonly Color32 MapInk14 = new Color32(70, 51, 31, 36);
            public static readonly Color32 MapInk15 = new Color32(70, 51, 31, 38);
            public static readonly Color32 MapInk16 = new Color32(70, 51, 31, 41);
            public static readonly Color32 MapInk18 = new Color32(70, 51, 31, 46);
            public static readonly Color32 MapInk20 = new Color32(70, 51, 31, 51);
            public static readonly Color32 MapInk22 = new Color32(70, 51, 31, 56);
            public static readonly Color32 MapInk24 = new Color32(70, 51, 31, 61);
            public static readonly Color32 MapInk25 = new Color32(70, 51, 31, 64);
            public static readonly Color32 MapInk26 = new Color32(70, 51, 31, 66);
            public static readonly Color32 MapInk28 = new Color32(70, 51, 31, 71);
            public static readonly Color32 MapInk30 = new Color32(70, 51, 31, 77);
            public static readonly Color32 MapInk32 = new Color32(70, 51, 31, 82);
            public static readonly Color32 MapInk35 = new Color32(70, 51, 31, 89);
            public static readonly Color32 MapInk40 = new Color32(70, 51, 31, 102);
            public static readonly Color32 MapInk45 = new Color32(70, 51, 31, 115);
            public static readonly Color32 MapInk50 = new Color32(70, 51, 31, 128);
            public static readonly Color32 MapInk55 = new Color32(70, 51, 31, 140);
            public static readonly Color32 MapInk60 = new Color32(70, 51, 31, 153);
            public static readonly Color32 MapInk62 = new Color32(70, 51, 31, 158);
            public static readonly Color32 MapInk65 = new Color32(70, 51, 31, 166);
            public static readonly Color32 MapInk66 = new Color32(70, 51, 31, 168);
            public static readonly Color32 MapInk68 = new Color32(70, 51, 31, 173);
            public static readonly Color32 MapInk70 = new Color32(70, 51, 31, 179);
            public static readonly Color32 MapInk72 = new Color32(70, 51, 31, 184);
            public static readonly Color32 MapInk75 = new Color32(70, 51, 31, 191);
            public static readonly Color32 MapInk78 = new Color32(70, 51, 31, 199);
            public static readonly Color32 MapInk80 = new Color32(70, 51, 31, 204);
            public static readonly Color32 MapInk85 = new Color32(70, 51, 31, 217);
            public static readonly Color32 MapInk90 = new Color32(70, 51, 31, 230);
            public static readonly Color32 MapInk92 = new Color32(70, 51, 31, 235);
            public static readonly Color32 MapInk95 = new Color32(70, 51, 31, 242);
            public static readonly Color32 MapInk96 = new Color32(70, 51, 31, 245);
            public static readonly Color32 Valkoinen = new Color32(255, 255, 255, 255);
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
        public static readonly Teema Harmaa = new Teema("harmaa", new Color32(130, 130, 130, 107), new Color32(224, 224, 224, 255), new Color32(189, 189, 189, 255), new Color32(255, 255, 255, 255), new Color32(170, 170, 170, 255), new Color32(170, 170, 170, 140));
        public static readonly Teema Lcd = new Teema("lcd", new Color32(12, 34, 20, 255), new Color32(132, 255, 160, 255), new Color32(132, 255, 160, 158), new Color32(132, 255, 160, 255), new Color32(124, 255, 158, 71), new Color32(132, 255, 160, 255));

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
            public static readonly Color32 Live = new Color32(232, 137, 46, 255);
            public static readonly Color32 LiveKuulto = new Color32(232, 137, 46, 166);
        }

        public static class Kuulto
        {
            public static readonly Color32 Accent10 = new Color32(217, 161, 59, 26);
            public static readonly Color32 Accent12 = new Color32(217, 161, 59, 31);
            public static readonly Color32 Accent18 = new Color32(217, 161, 59, 46);
            public static readonly Color32 Accent20 = new Color32(217, 161, 59, 51);
            public static readonly Color32 Accent22 = new Color32(217, 161, 59, 56);
            public static readonly Color32 Accent25 = new Color32(217, 161, 59, 64);
            public static readonly Color32 Accent28 = new Color32(217, 161, 59, 71);
            public static readonly Color32 Accent30 = new Color32(217, 161, 59, 77);
            public static readonly Color32 Accent55 = new Color32(217, 161, 59, 140);
            public static readonly Color32 Accent75 = new Color32(217, 161, 59, 191);
            public static readonly Color32 Accent90 = new Color32(217, 161, 59, 230);
            public static readonly Color32 AccentDark60 = new Color32(138, 97, 20, 153);
            public static readonly Color32 AccentDark90 = new Color32(138, 97, 20, 230);
            public static readonly Color32 AccentDark95 = new Color32(138, 97, 20, 242);
            public static readonly Color32 Bg85 = new Color32(29, 22, 16, 217);
            public static readonly Color32 HarmaaPinta100 = new Color32(130, 130, 130, 255);
            public static readonly Color32 HimmennysTumma100 = new Color32(14, 9, 4, 255);
            public static readonly Color32 HimmennysTumma45 = new Color32(14, 9, 4, 115);
            public static readonly Color32 HimmennysTumma55 = new Color32(14, 9, 4, 140);
            public static readonly Color32 HimmennysTumma60 = new Color32(14, 9, 4, 153);
            public static readonly Color32 InkLight18 = new Color32(243, 230, 208, 46);
            public static readonly Color32 InkLight35 = new Color32(243, 230, 208, 89);
            public static readonly Color32 Kulta12 = new Color32(234, 184, 78, 31);
            public static readonly Color32 Kulta18 = new Color32(234, 184, 78, 46);
            public static readonly Color32 Kulta28 = new Color32(234, 184, 78, 71);
            public static readonly Color32 Kulta30 = new Color32(234, 184, 78, 77);
            public static readonly Color32 Kulta95 = new Color32(234, 184, 78, 242);
            public static readonly Color32 LasiAvaruusKorostus12 = new Color32(93, 255, 168, 31);
            public static readonly Color32 LasiAvaruusKorostus14 = new Color32(93, 255, 168, 36);
            public static readonly Color32 LasiAvaruusKorostus16 = new Color32(93, 255, 168, 41);
            public static readonly Color32 LasiAvaruusKorostus18 = new Color32(93, 255, 168, 46);
            public static readonly Color32 LasiAvaruusKorostus20 = new Color32(93, 255, 168, 51);
            public static readonly Color32 LasiAvaruusKorostus22 = new Color32(93, 255, 168, 56);
            public static readonly Color32 LasiAvaruusKorostus30 = new Color32(93, 255, 168, 77);
            public static readonly Color32 LasiAvaruusKorostus35 = new Color32(93, 255, 168, 89);
            public static readonly Color32 LasiAvaruusKorostus45 = new Color32(93, 255, 168, 115);
            public static readonly Color32 LasiAvaruusMuste85 = new Color32(223, 246, 232, 217);
            public static readonly Color32 LasiAvaruusPinta100 = new Color32(4, 12, 9, 255);
            public static readonly Color32 LasiAvaruusPinta25 = new Color32(4, 12, 9, 64);
            public static readonly Color32 LasiAvaruusPinta60 = new Color32(4, 12, 9, 153);
            public static readonly Color32 LasiAvaruusPinta72 = new Color32(4, 12, 9, 184);
            public static readonly Color32 LasiAvaruusPinta80 = new Color32(4, 12, 9, 204);
            public static readonly Color32 LasiAvaruusPinta86 = new Color32(4, 12, 9, 219);
            public static readonly Color32 Mark12 = new Color32(176, 58, 43, 31);
            public static readonly Color32 Mark22 = new Color32(176, 58, 43, 56);
            public static readonly Color32 Musta100 = new Color32(0, 0, 0, 255);
            public static readonly Color32 Musta25 = new Color32(0, 0, 0, 64);
            public static readonly Color32 Musta50 = new Color32(0, 0, 0, 128);
            public static readonly Color32 Musta60 = new Color32(0, 0, 0, 153);
            public static readonly Color32 OverlayCard80 = new Color32(46, 33, 20, 204);
            public static readonly Color32 Panel294 = new Color32(53, 39, 26, 240);
            public static readonly Color32 Panel82 = new Color32(42, 31, 22, 209);
            public static readonly Color32 Paper82 = new Color32(239, 220, 180, 209);
            public static readonly Color32 Paper90 = new Color32(239, 220, 180, 230);
            public static readonly Color32 PaperDark18 = new Color32(220, 192, 143, 46);
            public static readonly Color32 PaperiKorostus25 = new Color32(122, 85, 20, 64);
            public static readonly Color32 PaperiKorostus26 = new Color32(122, 85, 20, 66);
            public static readonly Color32 PaperiKorostus28 = new Color32(122, 85, 20, 71);
            public static readonly Color32 PaperiKorostus30 = new Color32(122, 85, 20, 77);
            public static readonly Color32 PaperiKorostus32 = new Color32(122, 85, 20, 82);
            public static readonly Color32 PaperiKorostus34 = new Color32(122, 85, 20, 87);
            public static readonly Color32 PaperiKorostus35 = new Color32(122, 85, 20, 89);
            public static readonly Color32 PaperiKorostus40 = new Color32(122, 85, 20, 102);
            public static readonly Color32 PaperiKorostus45 = new Color32(122, 85, 20, 115);
            public static readonly Color32 PaperiKorostus50 = new Color32(122, 85, 20, 128);
            public static readonly Color32 PaperiKorostus55 = new Color32(122, 85, 20, 140);
            public static readonly Color32 PaperiKorostus60 = new Color32(122, 85, 20, 153);
            public static readonly Color32 PaperiKorostus65 = new Color32(122, 85, 20, 166);
            public static readonly Color32 PaperiKorostus75 = new Color32(122, 85, 20, 191);
            public static readonly Color32 PaperiKorostus80 = new Color32(122, 85, 20, 204);
            public static readonly Color32 PaperiKorostus90 = new Color32(122, 85, 20, 230);
            public static readonly Color32 PaperiKorostus95 = new Color32(122, 85, 20, 242);
            public static readonly Color32 PaperiMuste58 = new Color32(33, 29, 24, 148);
            public static readonly Color32 PaperiMuste60 = new Color32(33, 29, 24, 153);
            public static readonly Color32 PaperiMuste62 = new Color32(33, 29, 24, 158);
            public static readonly Color32 PaperiMuste65 = new Color32(33, 29, 24, 166);
            public static readonly Color32 PaperiMuste78 = new Color32(33, 29, 24, 199);
            public static readonly Color32 PaperiMuste85 = new Color32(33, 29, 24, 217);
            public static readonly Color32 PaperiMuste88 = new Color32(33, 29, 24, 224);
            public static readonly Color32 PaperiMuste92 = new Color32(33, 29, 24, 235);
            public static readonly Color32 PaperiMustePehmea80 = new Color32(92, 74, 50, 204);
            public static readonly Color32 PaperiPergamentti50 = new Color32(236, 216, 174, 128);
            public static readonly Color32 PaperiPergamentti62 = new Color32(236, 216, 174, 158);
            public static readonly Color32 PaperiPergamentti75 = new Color32(236, 216, 174, 191);
            public static readonly Color32 PaperiPinta35 = new Color32(245, 240, 226, 89);
            public static readonly Color32 PaperiPinta50 = new Color32(245, 240, 226, 128);
            public static readonly Color32 PaperiPinta55 = new Color32(245, 240, 226, 140);
            public static readonly Color32 PaperiPinta72 = new Color32(245, 240, 226, 184);
            public static readonly Color32 PaperiPinta82 = new Color32(245, 240, 226, 209);
            public static readonly Color32 PaperiPinta85 = new Color32(245, 240, 226, 217);
            public static readonly Color32 PaperiPinta88 = new Color32(245, 240, 226, 224);
            public static readonly Color32 PaperiPinta92 = new Color32(245, 240, 226, 235);
            public static readonly Color32 PaperiPinta94 = new Color32(245, 240, 226, 240);
            public static readonly Color32 TilaOnnistuminen16 = new Color32(47, 107, 63, 41);
            public static readonly Color32 TummaMuste10 = new Color32(241, 230, 208, 26);
            public static readonly Color32 TummaMuste18 = new Color32(241, 230, 208, 46);
            public static readonly Color32 TummaMuste25 = new Color32(241, 230, 208, 64);
            public static readonly Color32 TummaMuste55 = new Color32(241, 230, 208, 140);
            public static readonly Color32 TummaMuste60 = new Color32(241, 230, 208, 153);
            public static readonly Color32 TummaMuste75 = new Color32(241, 230, 208, 191);
            public static readonly Color32 TummaMuste85 = new Color32(241, 230, 208, 217);
            public static readonly Color32 TummaMuste94 = new Color32(241, 230, 208, 240);
            public static readonly Color32 Valkoinen35 = new Color32(255, 255, 255, 89);
            public static readonly Color32 Valkoinen42 = new Color32(255, 255, 255, 107);
            public static readonly Color32 Valkoinen50 = new Color32(255, 255, 255, 128);
            public static readonly Color32 Valkoinen60 = new Color32(255, 255, 255, 153);
            public static readonly Color32 Valkoinen62 = new Color32(255, 255, 255, 158);
            public static readonly Color32 Valkoinen65 = new Color32(255, 255, 255, 166);
            public static readonly Color32 Valkoinen85 = new Color32(255, 255, 255, 217);
            public static readonly Color32 Valkoinen92 = new Color32(255, 255, 255, 235);
        }

        public static class Erikois
        {
            public static readonly Color32 Aikajana1A22 = new Color32(214, 96, 72, 56);
            public static readonly Color32 Aikajana1A90 = new Color32(214, 96, 72, 230);
            public static readonly Color32 Aikajana2 = new Color32(240, 198, 118, 255);
            public static readonly Color32 Aikajana3 = new Color32(221, 208, 182, 255);
            public static readonly Color32 Astro1A85 = new Color32(10, 24, 18, 217);
            public static readonly Color32 Astro1A90 = new Color32(10, 24, 18, 230);
            public static readonly Color32 Astro2A72 = new Color32(12, 16, 26, 184);
            public static readonly Color32 Astro3 = new Color32(150, 170, 160, 255);
            public static readonly Color32 Astro4 = new Color32(233, 199, 123, 255);
            public static readonly Color32 Astro4A60 = new Color32(233, 199, 123, 153);
            public static readonly Color32 Elama1 = new Color32(168, 86, 26, 255);
            public static readonly Color32 Elama1A45 = new Color32(168, 86, 26, 115);
            public static readonly Color32 Elama2 = new Color32(217, 122, 43, 255);
            public static readonly Color32 Elama2A12 = new Color32(217, 122, 43, 31);
            public static readonly Color32 Ihme1A55 = new Color32(30, 9, 8, 140);
            public static readonly Color32 Ihme2 = new Color32(139, 61, 56, 255);
            public static readonly Color32 Ihme3 = new Color32(184, 134, 43, 255);
            public static readonly Color32 Kartuscha1A85 = new Color32(150, 30, 22, 217);
            public static readonly Color32 Kartuscha2 = new Color32(216, 52, 42, 255);
            public static readonly Color32 Leima1A62 = new Color32(72, 74, 116, 158);
            public static readonly Color32 Leima2A55 = new Color32(120, 168, 108, 140);
            public static readonly Color32 Leima3 = new Color32(226, 102, 76, 255);
            public static readonly Color32 Muu1 = new Color32(59, 59, 59, 255);
            public static readonly Color32 Muu2A95 = new Color32(112, 42, 24, 242);
            public static readonly Color32 Muu3 = new Color32(138, 74, 28, 255);
            public static readonly Color32 Muu4 = new Color32(154, 43, 33, 255);
            public static readonly Color32 Muu5 = new Color32(176, 125, 30, 255);
            public static readonly Color32 Muu6A32 = new Color32(94, 158, 106, 82);
            public static readonly Color32 Opas1 = new Color32(29, 90, 94, 255);
            public static readonly Color32 Opas2 = new Color32(28, 111, 107, 255);
            public static readonly Color32 Opas3 = new Color32(179, 119, 95, 255);
            public static readonly Color32 Radio1 = new Color32(58, 20, 8, 255);
            public static readonly Color32 Radio2 = new Color32(255, 214, 130, 255);
            public static readonly Color32 Saa1 = new Color32(76, 100, 120, 255);
            public static readonly Color32 Saa2 = new Color32(246, 221, 200, 255);
            public static readonly Color32 Saa3 = new Color32(224, 234, 231, 255);
            public static readonly Color32 Tila1A95 = new Color32(112, 42, 24, 242);
            public static readonly Color32 Tila2 = new Color32(44, 94, 42, 255);
            public static readonly Color32 Tila3 = new Color32(138, 44, 28, 255);
            public static readonly Color32 Tila4A85 = new Color32(74, 124, 58, 217);
            public static readonly Color32 Tila4A90 = new Color32(74, 124, 58, 230);
            public static readonly Color32 Tila5A75 = new Color32(150, 58, 34, 191);
            public static readonly Color32 Tila6 = new Color32(154, 43, 33, 255);
            public static readonly Color32 Tila6A12 = new Color32(154, 43, 33, 31);
            public static readonly Color32 Tila7A95 = new Color32(176, 138, 60, 242);
            public static readonly Color32 Tila8A10 = new Color32(106, 158, 84, 26);
            public static readonly Color32 Tila8A20 = new Color32(106, 158, 84, 51);
            public static readonly Color32 Tila9 = new Color32(192, 83, 58, 255);
            public static readonly Color32 Tila10 = new Color32(217, 112, 95, 255);
            public static readonly Color32 Tila11 = new Color32(143, 184, 134, 255);
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
            public const float Lcd = 30f;
            public const float LcdPieni = 15f;
            public const float LcdMini = 20f;
            public const float Rumpu = 12f;
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
            public const Kirjasin Lcd = Kirjasin.Lcd;
            public const Kirjasin LcdPieni = Kirjasin.Lcd;
            public const Kirjasin LcdMini = Kirjasin.Lcd;
            public const Kirjasin Rumpu = Kirjasin.Segmentti;
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
            public const float Hius = 2f;
            public const float Pieni = 6f;
            public const float Keski = 8f;
            public const float Nappi = 10f;
            public const float Kortti = 12f;
            public const float Pilleri = 999f;
        }

        public static class Nappi
        {
            public const float Korkeus = 38f;
            public const float Osuma = 44f;
            public const float Laukaisin = 64f;
            public const float Ohjaus = 40f;
            public const float OhjausKuvake = 22f;
            public const float OhjausIso = 56f;
        }

        public static class Galleria
        {
            public const float Sarake = 92f;
            public const float Vali = 10f;
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
            public static readonly (string Perhe, string Tyyli)[] Moderni = { ("SF Pro Text", "Regular"), ("SF Pro", "Regular"), (".SF UI Text", "Regular"), ("Helvetica Neue", "Regular"), ("Helvetica", "Regular") };
            public static readonly (string Perhe, string Tyyli)[] ModerniLihava = { ("SF Pro Display", "Semibold"), ("SF Pro", "Semibold"), (".SF UI Display", "Semibold"), ("Helvetica Neue", "Medium"), ("Helvetica Neue", "Bold"), ("Helvetica", "Bold") };
        }

        public static readonly string[] Pohjat = { "NOSTOKORTTI", "LUKUARKKI", "KORTTI", "PANEELI", "KUVANÄKYMÄ", "LINSSIN OHJAIN", "PULU", "PINNATTU PALKKI", "EDISTYMINEN", "LATAUSKUVA", "KENTTÄ", "LAUTAPELI", "GALLERIA", "OHJAUSNAPPI", "ERIKOISNOSTOT", "ISS-OHJAAMO" };
    }
}
