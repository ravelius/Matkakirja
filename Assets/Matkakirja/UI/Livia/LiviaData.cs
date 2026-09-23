// LIVIAN ELEIDEN TAULUKOT (Natiivi-UI, 23.9.2026).
//
// Siirretty sellaisenaan verkkopelin js/livia-uudet-versiot.js:stä
// (LIVIAN_UUDET_PELIELEET, TOUHUN_AJAT, HAUKOTUKSEN_TAHTI, KARTAN_NOKKAISUT,
// PROFIILIT, LIIKEPERHEET, RADAT) ja js/livia-svg.js:n LIVIA_SVG_ELEET-listasta.
// Taulukot on tuotettu koneellisesti webin moduulista (node), älä muokkaa
// käsin: kun webin arvot muuttuvat, tuota tiedosto uudelleen samalla tavalla.
// Aikaradat ovat (aika, arvo) -pareja litteässä float-taulukossa.
using System.Collections.Generic;

namespace Matkakirja.Natiivi
{
    /// <summary>Liikeperheen avainajat ja -arvot (null = nollarata).</summary>
    internal sealed class Liikeperhe
    {
        public readonly float[] Ajat, Paa, X, Y, Rinta, Siipi;
        public Liikeperhe(float[] ajat, float[] paa, float[] x, float[] y, float[] rinta, float[] siipi)
        { Ajat = ajat; Paa = paa; X = x; Y = y; Rinta = rinta; Siipi = siipi; }
    }

    internal static class LiviaData
    {
        // LIVIAN_UUDET_PELIELEET: id, nimi, kesto (ms), ryhmä.
        internal static readonly (string Id, string Nimi, int Kesto, string Ryhma)[] Eleet =
        {
            ("blink", "Rauhallinen kaksoisräpäytys", 1600, "Pieni ele"),
            ("glance", "Sivusilmäys", 2300, "Pieni ele"),
            ("turn", "Pään kääntö", 3000, "Pää"),
            ("lookRight", "Katse oikealle", 2200, "Pää"),
            ("lookUp", "Katse ylös", 2400, "Pää"),
            ("lookDown", "Katse alas", 2200, "Pää"),
            ("tilt", "Mitä ihmettä?", 2400, "Pää"),
            ("nod", "Kyllä kyllä", 2100, "Pää"),
            ("shake", "Ei todellakaan", 2100, "Pää"),
            ("doubleTake", "Hetkinen!", 2750, "Pää"),
            ("shock", "Kääk!", 2400, "Ilme"),
            ("embarrassed", "Nolostuminen", 3200, "Ilme"),
            ("angry", "Tuohtuminen", 2800, "Ilme"),
            ("bored", "Kyllästyminen", 3600, "Ilme"),
            ("puff", "Pieruposket", 3100, "Ilme"),
            ("manic", "Maaninen pullan tuijotus", 3300, "Ilme"),
            ("expert", "Arvokas tietäjä", 3200, "Ilme"),
            ("disbelief", "Ei voi olla", 3800, "Ilme"),
            ("confused", "Häh?", 2800, "Ilme"),
            ("happy", "Vahingonilo", 2500, "Ilme"),
            ("love", "Ihastus", 3800, "Ilme"),
            ("facepalm", "Voi minua", 3000, "Ilme"),
            ("talk", "Puhe", 1500, "Puhe"),
            ("listen", "Kuuntelen", 2600, "Puhe"),
            ("think", "Ajatus jumissa", 3400, "Puhe"),
            ("reading", "Pienellä painettu", 3200, "Puhe"),
            ("crumb", "En minä syönyt", 6200, "Touhu"),
            ("bread", "Pulla voittaa", 6600, "Touhu"),
            ("preen", "Sulkapuku kuntoon", 6000, "Touhu"),
            ("yawn", "Haukotus", 6600, "Touhu"),
            ("sleep", "Nukahdus", 8300, "Touhu"),
            ("wake", "Enhän minä nukkunut", 3800, "Touhu"),
            ("sneeze", "Aivastus", 3900, "Touhu"),
            ("wind", "Vastatuuli", 5000, "Touhu"),
            ("rain", "Siipi sateensuojana", 6100, "Touhu"),
            ("sun", "Liian kirkasta", 5400, "Touhu"),
            ("snow", "Lumi nokalla", 6100, "Touhu"),
            ("flyAway", "Lento kaukaisuuteen", 3100, "Liike"),
            ("flyBack", "Taivaalta takaisin", 3400, "Liike"),
            ("clumsyLand", "Kömpelö lasku", 2700, "Liike"),
            ("glassCrash", "Liian kovaa lasiin", 4200, "Liike"),
            ("walkRight", "Astelen oikealle", 2200, "Liike"),
            ("walkBack", "Astelen takaisin", 2200, "Liike"),
            ("peek", "Viivan alta kurkistus", 3300, "Liike"),
            ("owl", "Käyn pöllöllä", 4400, "Liike"),
            ("arrive", "Saapuminen oikealta", 1900, "Liike"),
            ("crash", "Rymistellen paikalle", 2600, "Liike"),
            ("emerge", "Ylös viivan alta", 1700, "Liike"),
            ("leaveRight", "Oikealle pois", 1100, "Liike"),
            ("leaveDown", "Alas piiloon", 1100, "Liike"),
            ("handoff", "Pöllön sijainen", 4700, "Liike"),
            ("glideIn", "Kiireinen ensiliito kartalta", 2700, "Liike"),
            ("trailerFlee", "Väistö trailerin tieltä", 1200, "Liike"),
            ("trailerBack", "Varovainen paluu trailerista", 1700, "Liike"),
            ("chatDashOut", "Salamana chatista", 300, "Liike"),
            ("chatDashBack", "Salamana takaisin chattiin", 100, "Liike"),
            ("chatDustOff", "Pölyt pois sulista", 1400, "Pelitilanne"),
            ("mapPeck", "Kartan pinnan nokkiminen", 4000, "Pelitilanne"),
            ("bunFeast", "Riemukas pullapalkinto", 7400, "Pelitilanne"),
            ("cityExplain", "Nykykaupungin selitys", 6200, "Puhe"),
            ("smile", "Lämmin hymy", 2700, "Pelitilanne"),
            ("grin", "Leveä virne", 3200, "Pelitilanne"),
            ("wink", "Yhteisymmärrys", 2300, "Pelitilanne"),
            ("welcome", "Hauska nähdä", 2900, "Pelitilanne"),
            ("present", "Minun ottamani!", 3400, "Pelitilanne"),
            ("glasses", "Silmälasit esiin", 4800, "Pelitilanne"),
            ("bookStudy", "Tietäväinen kirjan selaus", 4400, "Pelitilanne"),
            ("scratch", "Pään raapaisu", 2600, "Pelitilanne"),
            ("eyeRub", "Lasit ylös ja silmien hieraisu", 5200, "Pelitilanne"),
            ("chuckle", "Hiljainen naurunpyrskähdys", 3600, "Pelitilanne"),
        };

        // TOUHUN_AJAT: toiminnan aikarata (t, p) -pareina, aktiivijakso ja hengityssyklit.
        internal static readonly Dictionary<string, (float[] Rata, float Alku, float Loppu, int Sykli)> Touhu = new Dictionary<string, (float[], float, float, int)>
        {
            ["crumb"] = (new float[]{0,0,0.17f,0.18f,0.31f,0.31f,0.71f,0.44f,0.85f,0.72f,1f,1f}, 0.31f, 0.71f, 4),
            ["bread"] = (new float[]{0,0,0.17f,0.18f,0.31f,0.31f,0.72f,0.44f,0.86f,0.72f,1f,1f}, 0.31f, 0.72f, 4),
            ["preen"] = (new float[]{0,0,0.15f,0.18f,0.29f,0.46f,0.77f,0.62f,0.89f,0.79f,1f,1f}, 0.29f, 0.77f, 4),
            ["sleep"] = (new float[]{0,0,0.15f,0.24f,0.29f,0.46f,0.82f,0.82f,0.91f,0.87f,1f,1f}, 0.29f, 0.82f, 3),
            ["wake"] = (new float[]{0,0,0.28f,0.08f,0.42f,0.21f,0.59f,0.42f,0.82f,0.56f,1f,1f}, 0.42f, 0.82f, 2),
            ["sneeze"] = (new float[]{0,0,0.25f,0.32f,0.43f,0.45f,0.53f,0.47f,0.58f,0.59f,0.77f,0.76f,1f,1f}, 0.36f, 0.77f, 2),
            ["wind"] = (new float[]{0,0,0.17f,0.2f,0.3f,0.29f,0.82f,0.69f,0.91f,0.8f,1f,1f}, 0.3f, 0.82f, 4),
            ["rain"] = (new float[]{0,0,0.16f,0.2f,0.29f,0.34f,0.83f,0.77f,0.92f,0.85f,1f,1f}, 0.29f, 0.83f, 3),
            ["sun"] = (new float[]{0,0,0.17f,0.2f,0.34f,0.51f,0.83f,0.77f,0.92f,0.86f,1f,1f}, 0.34f, 0.83f, 3),
            ["snow"] = (new float[]{0,0,0.17f,0.22f,0.31f,0.43f,0.82f,0.77f,0.92f,0.85f,1f,1f}, 0.31f, 0.82f, 3),
            ["bunFeast"] = (new float[]{0,0,0.12f,0.16f,0.24f,0.24f,0.74f,0.63f,0.84f,0.72f,0.94f,0.9f,1f,1f}, 0.24f, 0.78f, 4),
        };

        internal static readonly float[] HaukotuksenTahti = new float[]{0,0,0.17f,0.2f,0.36f,0.4f,0.58f,0.52f,0.75f,0.62f,0.87f,0.78f,1f,1f};
        internal static readonly float[] KartanNokkaisut = new float[]{0,0,0.12f,0,0.22f,0.18f,0.285f,0.22f,0.32f,1f,0.35f,1f,0.43f,0,0.58f,0,0.66f,0.18f,0.71f,0.22f,0.745f,1f,0.775f,1f,0.85f,0,1f,0};

        // PROFIILIT: liikeperhe, voima, suunta.
        internal static readonly Dictionary<string, (string Perhe, float Voima, float Suunta)> Profiilit = new Dictionary<string, (string, float, float)>
        {
            ["blink"] = ("pieni", 0.35f, 1f),
            ["glance"] = ("katse", 0.7f, -1f),
            ["turn"] = ("katse", 1f, 1f),
            ["lookRight"] = ("katse", 0.85f, 1f),
            ["lookUp"] = ("katse", 0.7f, -1f),
            ["lookDown"] = ("katse", 0.7f, 1f),
            ["tilt"] = ("ihmetys", 0.85f, 1f),
            ["shake"] = ("torjunta", 1f, -1f),
            ["shock"] = ("havahtuu", 1f, -1f),
            ["embarrassed"] = ("ujous", 0.75f, 1f),
            ["angry"] = ("torjunta", 1f, 1f),
            ["bored"] = ("vasyy", 0.55f, -1f),
            ["puff"] = ("puuska", 0.9f, 1f),
            ["manic"] = ("innostus", 1f, -1f),
            ["expert"] = ("arvokas", 0.7f, 1f),
            ["confused"] = ("ihmetys", 0.85f, -1f),
            ["happy"] = ("innostus", 0.75f, 1f),
            ["love"] = ("ujous", 0.9f, -1f),
            ["facepalm"] = ("ujous", 1f, 1f),
            ["talk"] = ("puhe", 0.45f, 1f),
            ["listen"] = ("pieni", 0.55f, -1f),
            ["think"] = ("ihmetys", 0.65f, -1f),
            ["reading"] = ("kirja", 0.65f, 1f),
            ["crumb"] = ("ruoka", 0.7f, -1f),
            ["bread"] = ("ruoka", 1f, -1f),
            ["preen"] = ("touhu", 0.65f, 1f),
            ["sleep"] = ("vasyy", 1f, 1f),
            ["wake"] = ("havahtuu", 0.85f, 1f),
            ["sneeze"] = ("puuska", 1f, -1f),
            ["wind"] = ("saa", 0.85f, -1f),
            ["rain"] = ("saa", 0.75f, 1f),
            ["sun"] = ("saa", 0.7f, -1f),
            ["snow"] = ("saa", 0.65f, 1f),
            ["flyAway"] = ("lento", 0.9f, -1f),
            ["flyBack"] = ("lento", 0.7f, 1f),
            ["clumsyLand"] = ("tormays", 0.8f, 1f),
            ["glassCrash"] = ("tormays", 1f, -1f),
            ["walkRight"] = ("kavely", 0.55f, 1f),
            ["walkBack"] = ("kavely", 0.55f, -1f),
            ["peek"] = ("kurkistus", 0.85f, -1f),
            ["owl"] = ("kurkistus", 0.75f, 1f),
            ["arrive"] = ("lento", 0.5f, 1f),
            ["crash"] = ("tormays", 0.85f, 1f),
            ["emerge"] = ("kurkistus", 0.7f, -1f),
            ["leaveRight"] = ("kavely", 0.45f, 1f),
            ["leaveDown"] = ("kurkistus", 0.5f, 1f),
            ["handoff"] = ("kurkistus", 0.9f, -1f),
            ["glideIn"] = ("lento", 0.8f, 1f),
            ["trailerFlee"] = ("lento", 1f, -1f),
            ["trailerBack"] = ("kurkistus", 0.8f, 1f),
            ["chatDashOut"] = ("lento", 0.55f, -1f),
            ["chatDashBack"] = ("lento", 0.55f, 1f),
            ["chatDustOff"] = ("touhu", 0.9f, 1f),
            ["mapPeck"] = ("ruoka", 0.7f, -1f),
            ["bunFeast"] = ("ruoka", 1f, 1f),
            ["cityExplain"] = ("puhe", 0.75f, -1f),
            ["smile"] = ("pieni", 0.55f, 1f),
            ["wink"] = ("pieni", 0.65f, -1f),
            ["present"] = ("arvokas", 0.8f, 1f),
            ["glasses"] = ("arvokas", 0.6f, -1f),
            ["scratch"] = ("touhu", 0.7f, 1f),
            ["eyeRub"] = ("vasyy", 0.8f, -1f),
        };

        // LIIKEPERHEET: ajat ja arvot (paa, x, y, rinta, siipi; null = nollia).
        internal static readonly Dictionary<string, Liikeperhe> Perheet = new Dictionary<string, Liikeperhe>
        {
            ["pieni"] = new Liikeperhe(new float[]{0,0.16f,0.38f,0.68f,0.91f,1f},
                new float[]{0,-1.5f,2.2f,1f,0,0}, null, new float[]{0,1f,-1f,0,0,0}, new float[]{0,0,-0.8f,0,0,0}, new float[]{0,0,0.12f,0.08f,0,0}),
            ["katse"] = new Liikeperhe(new float[]{0,0.1f,0.24f,0.43f,0.7f,0.93f,1f},
                new float[]{0,-3f,9f,7f,-3f,0,0}, new float[]{0,-1.5f,3f,3f,-1f,0,0}, new float[]{0,1f,-3f,-3f,1f,0,0}, new float[]{0,0,0,1.5f,0,0,0}, new float[]{0,0,0,0.12f,0.1f,0,0}),
            ["ihmetys"] = new Liikeperhe(new float[]{0,0.1f,0.24f,0.39f,0.64f,0.91f,1f},
                new float[]{0,4f,-12f,-9f,5f,0,0}, new float[]{0,-2f,3f,3f,0,0,0}, new float[]{0,2f,-4f,-3f,1f,0,0}, new float[]{0,0,2f,1f,-1f,0,0}, new float[]{0,0,0.18f,0.65f,0.2f,0,0}),
            ["torjunta"] = new Liikeperhe(new float[]{0,0.12f,0.25f,0.36f,0.5f,0.66f,0.91f,1f},
                new float[]{0,4f,-12f,9f,-8f,4f,0,0}, new float[]{0,0,-3f,4f,-3f,1f,0,0}, new float[]{0,2f,-3f,2f,-2f,1f,0,0}, new float[]{0,0,3f,-2f,2f,0,0,0}, new float[]{0,0,0.15f,0.82f,0.75f,0.36f,0,0}),
            ["havahtuu"] = new Liikeperhe(new float[]{0,0.12f,0.22f,0.29f,0.49f,0.71f,0.94f,1f},
                new float[]{0,5f,5f,-17f,-8f,3f,0,0}, null, new float[]{0,2f,2f,-8f,-5f,2f,0,0}, new float[]{0,0,0,4f,2f,-1f,0,0}, new float[]{0,0,0,0.95f,0.8f,0.25f,0,0}),
            ["ujous"] = new Liikeperhe(new float[]{0,0.13f,0.32f,0.51f,0.72f,0.95f,1f},
                new float[]{0,2f,-7f,-9f,-3f,0,0}, new float[]{0,0,-2f,-2f,0,0,0}, new float[]{0,1f,3f,4f,1f,0,0}, new float[]{0,0,2f,3f,0,0,0}, new float[]{0,0,0.16f,0.7f,0.5f,0,0}),
            ["vasyy"] = new Liikeperhe(new float[]{0,0.18f,0.39f,0.66f,0.83f,0.96f,1f},
                new float[]{0,-2f,8f,11f,-4f,0,0}, null, new float[]{0,1f,5f,8f,2f,0,0}, new float[]{0,0,2f,4f,-1f,0,0}, new float[]{0,0,0.1f,0.16f,0.08f,0,0}),
            ["puuska"] = new Liikeperhe(new float[]{0,0.15f,0.27f,0.34f,0.48f,0.68f,0.92f,1f},
                new float[]{0,3f,7f,-18f,4f,-3f,0,0}, null, new float[]{0,1f,3f,-9f,3f,1f,0,0}, new float[]{0,0,-2f,5f,-3f,1f,0,0}, new float[]{0,0,0.12f,0.9f,0.55f,0.2f,0,0}),
            ["innostus"] = new Liikeperhe(new float[]{0,0.11f,0.23f,0.42f,0.57f,0.76f,0.95f,1f},
                new float[]{0,2f,-10f,-7f,3f,-2f,0,0}, null, new float[]{0,1f,-6f,-3f,1f,-1f,0,0}, new float[]{0,0,-3f,-2f,2f,0,0,0}, new float[]{0,0,0.46f,0.84f,0.7f,0.3f,0,0}),
            ["arvokas"] = new Liikeperhe(new float[]{0,0.17f,0.36f,0.65f,0.82f,0.96f,1f},
                new float[]{0,-2f,8f,8f,3f,0,0}, null, new float[]{0,1f,-5f,-5f,-2f,0,0}, new float[]{0,0,-3f,-3f,-1f,0,0}, new float[]{0,0,0.23f,0.67f,0.45f,0,0}),
            ["puhe"] = new Liikeperhe(new float[]{0,0.13f,0.3f,0.46f,0.59f,0.76f,0.95f,1f},
                new float[]{0,2f,-5f,2f,-7f,1f,0,0}, null, new float[]{0,0,-2f,1f,-3f,0,0,0}, new float[]{0,0,-1f,1f,-2f,0,0,0}, new float[]{0,0,0.22f,0.53f,0.64f,0.26f,0,0}),
            ["kirja"] = new Liikeperhe(new float[]{0,0.11f,0.3f,0.47f,0.63f,0.84f,0.96f,1f},
                new float[]{0,-3f,-9f,-5f,-8f,2f,0,0}, new float[]{0,0,-2f,1f,-1f,0,0,0}, new float[]{0,1f,3f,2f,3f,0,0,0}, new float[]{0,0,2f,1f,2f,0,0,0}, new float[]{0,0,0.17f,0.67f,0.45f,0.12f,0,0}),
            ["ruoka"] = new Liikeperhe(new float[]{0,0.1f,0.24f,0.36f,0.49f,0.65f,0.8f,0.96f,1f},
                new float[]{0,3f,-11f,4f,-8f,3f,-3f,0,0}, null, new float[]{0,1f,-5f,2f,-4f,1f,-1f,0,0}, new float[]{0,0,-2f,2f,-1f,1f,0,0,0}, new float[]{0,0,0.4f,0.8f,0.55f,0.75f,0.2f,0,0}),
            ["touhu"] = new Liikeperhe(new float[]{0,0.13f,0.29f,0.45f,0.57f,0.76f,0.95f,1f},
                new float[]{0,2f,-7f,5f,-6f,2f,0,0}, null, new float[]{0,1f,-2f,1f,-3f,0,0,0}, new float[]{0,0,2f,-2f,1f,0,0,0}, new float[]{0,0,0.22f,0.78f,0.5f,0.27f,0,0}),
            ["saa"] = new Liikeperhe(new float[]{0,0.14f,0.3f,0.56f,0.75f,0.95f,1f},
                new float[]{0,3f,-8f,-9f,3f,0,0}, null, new float[]{0,1f,-3f,-2f,1f,0,0}, new float[]{0,0,3f,3f,0,0,0}, new float[]{0,0,0.2f,0.58f,0.25f,0,0}),
            ["lento"] = new Liikeperhe(new float[]{0,0.08f,0.21f,0.5f,0.75f,0.91f,1f},
                new float[]{0,5f,-7f,-4f,3f,0,0}, null, new float[]{0,2f,-5f,-2f,1f,0,0}, new float[]{0,0,-2f,1f,-1f,0,0}, new float[]{0,0,0.25f,0.75f,0.47f,0.12f,0}),
            ["tormays"] = new Liikeperhe(new float[]{0,0.17f,0.31f,0.42f,0.49f,0.66f,0.82f,0.97f,1f},
                new float[]{0,5f,6f,-20f,12f,-9f,4f,0,0}, null, new float[]{0,2f,2f,-10f,6f,-4f,2f,0,0}, new float[]{0,0,1f,6f,-5f,3f,0,0,0}, new float[]{0,0,0.25f,1f,0.95f,0.55f,0.22f,0,0}),
            ["kavely"] = new Liikeperhe(new float[]{0,0.13f,0.29f,0.46f,0.62f,0.81f,0.97f,1f},
                new float[]{0,-2f,3f,-2f,3f,-1f,0,0}, null, new float[]{0,0,-1f,0,-1f,0,0,0}, new float[]{0,0,1f,-1f,1f,0,0,0}, new float[]{0,0,0.13f,0.22f,0.17f,0.08f,0,0}),
            ["kurkistus"] = new Liikeperhe(new float[]{0,0.15f,0.32f,0.49f,0.67f,0.84f,0.97f,1f},
                new float[]{0,3f,-9f,-6f,5f,-2f,0,0}, new float[]{0,0,-3f,-3f,2f,0,0,0}, new float[]{0,1f,-6f,-4f,1f,0,0,0}, new float[]{0,0,-2f,-1f,2f,0,0,0}, new float[]{0,0,0.14f,0.42f,0.37f,0.12f,0,0}),
        };

        // RADAT: käsin piirrettyjen versioiden avainradat (vain pelin eleet; ilahtuu ja bookPanic eivät ole pelissä).
        internal static readonly Dictionary<string, Dictionary<string, float[]>> Radat = new Dictionary<string, Dictionary<string, float[]>>
        {
            ["uusi-chuckle"] = new Dictionary<string, float[]>
            {
                ["paaKulma"] = new float[]{0,0,0.12f,5f,0.24f,5f,0.32f,-16f,0.4f,5f,0.46f,5f,0.53f,-10f,0.62f,3f,0.73f,-2f,0.94f,0,1f,0},
                ["paaY"] = new float[]{0,0,0.19f,-4f,0.26f,-4f,0.34f,7f,0.43f,-2f,0.48f,-2f,0.55f,4f,0.66f,0,1f,0},
                ["rinta"] = new float[]{0,0,0.24f,-3f,0.36f,5f,0.45f,-1f,0.57f,3f,0.7f,0,1f,0},
                ["hengitys"] = new float[]{0,0,0.2f,0.7f,0.27f,0.7f,0.35f,-0.55f,0.45f,0.35f,0.48f,0.35f,0.57f,-0.35f,0.73f,0,1f,0},
                ["ilme"] = new float[]{0,0,0.15f,0.6f,0.27f,0.9f,0.34f,1f,0.62f,1f,0.78f,0.6f,0.96f,0,1f,0},
                ["siipi"] = new float[]{0,0,0.2f,0,0.3f,0.75f,0.38f,0.85f,0.64f,0.85f,0.85f,0,1f,0},
                ["suusiipi"] = new float[]{0,0,0.23f,0,0.34f,1f,0.63f,1f,0.85f,0,1f,0},
                ["sulat"] = new float[]{0,0,0.24f,0,0.36f,0.85f,0.67f,0.85f,0.89f,0,1f,0},
                ["rapaytys"] = new float[]{0,0,0.84f,0,0.88f,1f,0.92f,0,1f,0},
            },
            ["uusi-yawn"] = new Dictionary<string, float[]>
            {
                ["paaKulma"] = new float[]{0,0,0.12f,-8f,0.21f,-8f,0.37f,17f,0.5f,20f,0.6f,20f,0.72f,4f,0.81f,-7f,0.96f,0,1f,0},
                ["paaY"] = new float[]{0,0,0.14f,4f,0.21f,4f,0.38f,-10f,0.52f,-13f,0.61f,-13f,0.78f,5f,0.94f,0,1f,0},
                ["rinta"] = new float[]{0,0,0.19f,2f,0.43f,-5f,0.62f,-5f,0.79f,3f,0.97f,0,1f,0},
                ["hengitys"] = new float[]{0,0,0.18f,-0.25f,0.38f,0.8f,0.53f,1f,0.62f,1f,0.78f,-0.4f,0.98f,0,1f,0},
                ["ilme"] = new float[]{0,0,0.13f,0.7f,0.25f,1f,0.68f,1f,0.87f,0.7f,1f,0},
                ["siipi"] = new float[]{0,0,0.24f,0,0.4f,0.8f,0.64f,0.8f,0.79f,0.3f,0.93f,0,1f,0},
                ["suusiipi"] = new float[]{0,0,0.28f,0,0.45f,1f,0.65f,1f,0.89f,0,1f,0},
                ["takasiipi"] = new float[]{0,0,0.3f,0,0.49f,0.42f,0.63f,0.42f,0.88f,0,1f,0},
                ["sulat"] = new float[]{0,0,0.29f,0,0.47f,0.8f,0.67f,0.8f,0.95f,0,1f,0},
                ["rapaytys"] = new float[]{0,0,0.25f,0,0.38f,0.88f,0.65f,0.88f,0.79f,0.3f,0.88f,0,1f,0},
            },
            ["uusi-grin"] = new Dictionary<string, float[]>
            {
                ["paaKulma"] = new float[]{0,0,0.13f,-4f,0.24f,-4f,0.39f,10f,0.49f,7f,0.69f,7f,0.83f,2f,1f,0},
                ["paaX"] = new float[]{0,0,0.24f,0,0.42f,3f,0.69f,3f,0.96f,0,1f,0},
                ["paaY"] = new float[]{0,0,0.2f,2f,0.4f,-5f,0.51f,-3f,0.72f,-3f,1f,0},
                ["rinta"] = new float[]{0,0,0.25f,1f,0.46f,-3f,0.72f,-3f,0.97f,0,1f,0},
                ["hengitys"] = new float[]{0,0,0.25f,-0.1f,0.46f,0.45f,0.71f,0.45f,0.98f,0,1f,0},
                ["katse"] = new float[]{0,0,0.12f,0.75f,0.27f,0.75f,0.4f,0,1f,0},
                ["ilme"] = new float[]{0,0,0.17f,0.5f,0.37f,1f,0.69f,1f,0.91f,0,1f,0},
                ["rapaytys"] = new float[]{0,0,0.9f,0,0.935f,0.7f,0.97f,0,1f,0},
            },
            ["uusi-disbelief"] = new Dictionary<string, float[]>
            {
                ["paaKulma"] = new float[]{0,0,0.13f,4f,0.26f,4f,0.32f,-5f,0.42f,-3f,0.57f,-3f,0.68f,7f,0.79f,7f,0.98f,0,1f,0},
                ["paaX"] = new float[]{0,0,0.13f,-2f,0.27f,-2f,0.37f,5f,0.58f,5f,0.7f,7f,0.81f,7f,1f,0},
                ["paaY"] = new float[]{0,0,0.27f,0,0.34f,3f,0.59f,3f,0.72f,-1f,1f,0},
                ["rinta"] = new float[]{0,0,0.31f,0,0.42f,-3f,0.64f,-3f,0.84f,0,1f,0},
                ["ilme"] = new float[]{0,0,0.14f,0.7f,0.28f,0.7f,0.37f,1f,0.75f,1f,0.96f,0,1f,0},
                ["katse"] = new float[]{0,0,0.55f,0,0.66f,1f,0.8f,1f,0.96f,0,1f,0},
                ["siipi"] = new float[]{0,0,0.35f,0,0.46f,0.7f,0.57f,0.7f,0.77f,0,1f,0},
                ["takasiipi"] = new float[]{0,0,0.42f,0,0.55f,0.42f,0.62f,0.42f,0.84f,0,1f,0},
                ["sulat"] = new float[]{0,0,0.4f,0,0.51f,0.7f,0.6f,0.7f,0.82f,0,1f,0},
                ["rapaytys"] = new float[]{0,0,0.8f,0,0.84f,1f,0.89f,0,1f,0},
            },
            ["uusi-nod"] = new Dictionary<string, float[]>
            {
                ["paaKulma"] = new float[]{0,0,0.07f,0,0.15f,8f,0.245f,-24f,0.27f,-23f,0.4f,3f,0.53f,-12f,0.59f,-9f,0.79f,1f,0.94f,0,1f,0},
                ["paaY"] = new float[]{0,0,0.15f,-3f,0.25f,8f,0.4f,-1f,0.53f,4f,0.81f,0,1f,0},
                ["rinta"] = new float[]{0,0,0.18f,-1.2f,0.31f,3f,0.45f,0,0.59f,1.3f,0.85f,0,1f,0},
                ["rapaytys"] = new float[]{0,0,0.18f,0,0.215f,0.85f,0.275f,0,0.81f,0,0.84f,1f,0.88f,0,1f,0},
            },
            ["uusi-doubleTake"] = new Dictionary<string, float[]>
            {
                ["paaKulma"] = new float[]{0,0,0.08f,0,0.16f,7f,0.24f,7f,0.32f,0,0.395f,15f,0.46f,-4f,0.54f,4f,0.67f,4f,0.88f,0,1f,0},
                ["paaX"] = new float[]{0,0,0.16f,4f,0.24f,4f,0.32f,0,0.4f,-7f,0.48f,-4f,0.67f,-4f,0.94f,0,1f,0},
                ["paaY"] = new float[]{0,0,0.33f,0,0.405f,-9f,0.48f,-4f,0.64f,-4f,0.94f,0,1f,0},
                ["rinta"] = new float[]{0,0,0.2f,-1f,0.33f,0,0.45f,4f,0.55f,1.2f,0.71f,1.2f,0.96f,0,1f,0},
                ["katse"] = new float[]{0,0,0.095f,1f,0.26f,1f,0.32f,0,0.37f,-0.5f,0.64f,-0.5f,0.9f,0,1f,0},
                ["ilme"] = new float[]{0,0,0.34f,0,0.395f,1f,0.55f,1f,0.83f,0,1f,0},
                ["rapaytys"] = new float[]{0,0,0.27f,0,0.3f,1f,0.33f,0,0.81f,0,0.85f,1f,0.89f,0,1f,0},
            },
            ["uusi-welcome"] = new Dictionary<string, float[]>
            {
                ["paaKulma"] = new float[]{0,0,0.08f,5f,0.19f,-6f,0.29f,2f,0.4f,-2f,0.62f,-2f,0.9f,0,1f,0},
                ["paaY"] = new float[]{0,0,0.1f,-2f,0.2f,3f,0.31f,0,1f,0},
                ["rinta"] = new float[]{0,0,0.12f,2f,0.25f,-4f,0.38f,-2f,0.64f,-2f,0.89f,0.5f,1f,0},
                ["siipi"] = new float[]{0,0,0.09f,0,0.16f,0.15f,0.245f,1f,0.31f,0.89f,0.45f,0.89f,0.52f,1f,0.6f,0.87f,0.67f,0.87f,0.9f,0,1f,0},
                ["takasiipi"] = new float[]{0,0,0.15f,0,0.28f,0.74f,0.38f,0.62f,0.64f,0.62f,0.94f,0,1f,0},
                ["sulat"] = new float[]{0,0,0.15f,0,0.28f,1f,0.34f,0.82f,0.54f,1f,0.69f,0.84f,0.95f,0,1f,0},
                ["ilme"] = new float[]{0,0,0.09f,0.2f,0.22f,1f,0.7f,1f,0.96f,0,1f,0},
                ["rapaytys"] = new float[]{0,0,0.07f,0,0.1f,1f,0.14f,0,0.75f,0,0.78f,0.9f,0.82f,0,1f,0},
            },
            ["uusi-bookStudy"] = new Dictionary<string, float[]>
            {
                ["paaKulma"] = new float[]{0,0,0.1f,-10f,0.28f,-10f,0.37f,-5f,0.49f,-5f,0.58f,-8f,0.73f,-8f,0.88f,3f,1f,0},
                ["paaX"] = new float[]{0,0,0.11f,-3f,0.3f,1f,0.38f,-2f,0.56f,-2f,0.7f,2f,0.88f,0,1f,0},
                ["paaY"] = new float[]{0,0,0.12f,4f,0.3f,4f,0.39f,1f,0.55f,3f,0.73f,3f,0.88f,-1f,1f,0},
                ["rinta"] = new float[]{0,0,0.16f,-1.8f,0.31f,-1.8f,0.45f,-3f,0.61f,-1.5f,0.77f,-1.5f,1f,0},
                ["katse"] = new float[]{0,0,0.1f,-0.6f,0.29f,0.6f,0.34f,-0.6f,0.57f,-0.6f,0.72f,0.5f,0.86f,0,1f,0},
                ["ilme"] = new float[]{0,0,0.1f,1f,0.73f,1f,0.9f,0,1f,0},
                ["siipi"] = new float[]{0,0,0.3f,0,0.4f,0.65f,0.46f,0.75f,0.535f,1f,0.6f,0.8f,0.73f,0,1f,0},
                ["sulat"] = new float[]{0,0,0.34f,0,0.44f,0.75f,0.555f,1f,0.64f,0.7f,0.78f,0,1f,0},
                ["sivu"] = new float[]{0,0,0.445f,0,0.49f,0.12f,0.565f,0.88f,0.605f,1f,1f,1f},
                ["paperi"] = new float[]{0,0,0.52f,0,0.61f,1f,0.66f,-0.38f,0.72f,0.12f,0.8f,0,1f,0},
                ["rapaytys"] = new float[]{0,0,0.305f,0,0.326f,1f,0.35f,0,0.83f,0,0.855f,1f,0.885f,0,1f,0},
            },
        };
    }
}
