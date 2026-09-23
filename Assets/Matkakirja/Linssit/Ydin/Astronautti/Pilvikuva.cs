// PILVIKUVAN ALFA (web js/linssit/astro-sumu.js pilvikuvanAlfa): NASA Blue Marble
// -pilvikuva on mustalla taustalla, joten alfa on luminanssi kynnystettynä
// (JPEG-kohina 0,06 pois) ja napoja kohti häivytettynä (66–80°), koska
// tasavälinen kuva venyy navoilla viuhkaksi. Väri on vaalea harmaa luminanssin mukaan.
using System;

namespace Matkakirja.Linssit.Astronautti
{
    public static class Pilvikuva
    {
        public const double NapaAlku = 66, NapaLoppu = 80, Kynnys = 0.06;
        public const int Leveys = 2048, Korkeus = 1024;

        static double Raja01(double x) => x < 0 ? 0 : (x > 1 ? 1 : x);

        /// <summary>
        /// Muuntaa RGBA-pikselit paikallaan. Rivi 0 on POHJOISIN (kuten webin
        /// kankaalla); Unityn Texture2D.GetPixels32 antaa eteläisimmän ensin, joten
        /// sovitin kertoo suunnan (pohjoinenEnsin).
        /// </summary>
        public static void Alfa(byte[] rgba, int leveys, int korkeus, bool pohjoinenEnsin = true)
        {
            for (int y = 0; y < korkeus; y++)
            {
                int rivi = pohjoinenEnsin ? y : korkeus - 1 - y;
                double lat = 90 - (rivi + 0.5) / korkeus * 180;
                double napa = 1 - Raja01((Math.Abs(lat) - NapaAlku) / (NapaLoppu - NapaAlku));
                for (int x = 0; x < leveys; x++)
                {
                    int i = (y * leveys + x) * 4;
                    double lum = (rgba[i] * 0.2126 + rgba[i + 1] * 0.7152 + rgba[i + 2] * 0.0722) / 255;
                    double alfa = Math.Pow(Raja01((lum - Kynnys) / (1 - Kynnys)), 0.85);
                    int savy = 226 + (int)Math.Floor(29 * lum + 0.5);
                    rgba[i] = (byte)savy;
                    rgba[i + 1] = (byte)savy;
                    rgba[i + 2] = (byte)Math.Min(255, savy + 6);
                    rgba[i + 3] = (byte)Math.Floor(255 * alfa * napa + 0.5);
                }
            }
        }
    }
}
