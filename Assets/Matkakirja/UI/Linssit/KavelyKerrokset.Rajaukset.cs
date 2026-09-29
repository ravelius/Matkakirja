// GENEROITU tyokalut/kavely_kerrokset.py (Codexin manifest.json 06a0a84c): älä muokkaa käsin.
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static partial class KavelyKerrokset
    {
        /// <summary>Kerroksen rajaus kankaalla (px, y alas): tiedosto on rajattu tähän.</summary>
        public static readonly Dictionary<string, RectInt> Rajaukset = new Dictionary<string, RectInt>
        {
            { "iphone/ilmalukko-kehys", new RectInt(0, 0, 1290, 2796) },
            { "iphone/ilmalukko-luukku", new RectInt(126, 530, 1032, 1394) },
            { "iphone/ilmalukko-valo", new RectInt(47, 464, 1197, 1526) },
            { "iphone/kaide", new RectInt(0, 1675, 1290, 1121) },
            { "iphone/kasine-irti", new RectInt(0, 1866, 954, 930) },
            { "iphone/kasine-kiinni", new RectInt(0, 1866, 954, 930) },
            { "iphone/koysi", new RectInt(524, 2205, 338, 591) },
            { "iphone/paneeli", new RectInt(617, 0, 673, 637) },
            { "iphone/rakenne", new RectInt(0, 0, 420, 1719) },
            { "iphone/valo-kaide", new RectInt(250, 1656, 1040, 1140) },
            { "iphone/valo-kasine", new RectInt(402, 1847, 574, 949) },
            { "iphone/valo-rakenne", new RectInt(179, 0, 263, 1738) },
            { "iphone/vertailukortti", new RectInt(0, 0, 1600, 1000) },
            { "iphone/visiiri", new RectInt(0, 0, 449, 2796) },
            { "ipad/ilmalukko-kehys", new RectInt(0, 0, 2732, 2048) },
            { "ipad/ilmalukko-luukku", new RectInt(613, 236, 1500, 1395) },
            { "ipad/ilmalukko-valo", new RectInt(556, 167, 1621, 1525) },
            { "ipad/kaide", new RectInt(0, 1152, 2157, 896) },
            { "ipad/kasine-irti", new RectInt(0, 1227, 1255, 821) },
            { "ipad/kasine-kiinni", new RectInt(0, 1224, 1238, 824) },
            { "ipad/koysi", new RectInt(683, 1633, 374, 415) },
            { "ipad/paneeli", new RectInt(937, 0, 1335, 440) },
            { "ipad/rakenne", new RectInt(0, 0, 1057, 1236) },
            { "ipad/valo-kaide", new RectInt(0, 1134, 2179, 914) },
            { "ipad/valo-kasine", new RectInt(494, 1206, 762, 842) },
            { "ipad/valo-rakenne", new RectInt(466, 0, 612, 1254) },
            { "ipad/vertailukortti", new RectInt(0, 0, 1600, 1000) },
            { "ipad/visiiri", new RectInt(0, 0, 989, 2048) },
        };

        public static readonly Dictionary<string, Variantti> Variantit = new Dictionary<string, Variantti>
        {
            { "iphone", new Variantti { Kangas = new Vector2(1290, 2796), Karabiini = new Vector2(840, 2124), KoysiAnkkuri = new Vector2(621, 2796), Vapaa = Rect.MinMaxRect(470, 700, 1210, 1780), HorisonttiY = 1250, Sarana = new Vector2(154, 1230), Aukko = Rect.MinMaxRect(151, 566, 1139, 1887), LuukunKulma = 108 } },
            { "ipad", new Variantti { Kangas = new Vector2(2732, 2048), Karabiini = new Vector2(1109, 1482), KoysiAnkkuri = new Vector2(736, 2048), Vapaa = Rect.MinMaxRect(1080, 550, 2350, 1180), HorisonttiY = 910, Sarana = new Vector2(632, 962), Aukko = Rect.MinMaxRect(660, 270, 2072, 1588), LuukunKulma = 105 } },
        };

        /// <summary>Vertailukortin alueet (1600 × 1000): kuvat vasen/oikea, tekstit vasen/oikea ja sulku.</summary>
        public static readonly Rect KuvaVasen = Rect.MinMaxRect(112, 170, 760, 665), KuvaOikea = Rect.MinMaxRect(840, 170, 1488, 665),
            TekstiVasen = Rect.MinMaxRect(122, 728, 750, 874), TekstiOikea = Rect.MinMaxRect(850, 728, 1478, 874), Sulku = Rect.MinMaxRect(1487, 56, 1541, 110);
        public static readonly Vector2 KortinKangas = new Vector2(1600, 1000);
    }
}
