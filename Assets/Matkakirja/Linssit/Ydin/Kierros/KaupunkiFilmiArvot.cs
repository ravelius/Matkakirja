// KUUMAILMAPALLON ELOKUVAMAINEN JÄLKIKÄSITTELY: arvot (omistaja 9.10.2026 "pehmennys ja rae ja värien tummennus"; Natiiviseppä,
// juna 170). Moottoriton valinta päivä/yö ja lämmön mukaan; KaupunkiFilmi (Unity) vie ne URP-volyymiin. Yksi profiili, ei säätimiä
// pelaajalle. ShadowsMidtonesHighlights: rgb = sävy (1 = neutraali), w = valotuksen siirto (negatiivinen tummentaa).
// VAHVISTUS 9.10. 03.0x (Päätoimittaja: ensimmäinen kuvapari liian hienovarainen, omistaja ei näe eroa; maltillisesti lisää):
//   päivä: varjot viileämmät (0,88 / 0,94 / 1,10) ja −0,16, keskisävyt −0,09, valot lämpimät; saturaatio −12; rae 0,32 (karkeampi
//          Medium4, näkyy tabletin katseluetäisyydellä; 0,45 oli taivaalla likainen); hehku 0,25; vinjetti 0,24
//   yö:    kevyempi tummennus (−0,08 / −0,05), saturaatio −6, rae 0,36 (yörae luonteva), hehku 0,4 (valot), vinjetti 0,26
//   kuuma: rae, pehmennys ja hehku pois (koko ruudun passeja); sävytys ja vinjetti jäävät (uber-passissa, lähes ilmaisia)
namespace Matkakirja.Linssit.Kierros
{
    public struct FilmiArvot
    {
        public float VarjoR, VarjoG, VarjoB, VarjoTummennus, KeskiTummennus, ValoR, ValoG, ValoB;
        public float Saturaatio, Rae, Hehku, Vinjetti;
        public bool Pehmennys;
    }

    public static class KaupunkiFilmiArvot
    {
        public static FilmiArvot Valitse(bool yo, bool kuuma)
        {
            var a = new FilmiArvot
            {
                VarjoR = 0.88f, VarjoG = 0.94f, VarjoB = 1.10f,
                ValoR = 1.05f, ValoG = 1.01f, ValoB = 0.93f,
                VarjoTummennus = yo ? -0.08f : -0.16f,
                KeskiTummennus = yo ? -0.05f : -0.09f,
                Saturaatio = yo ? -6f : -12f,
                Rae = yo ? 0.36f : 0.32f,   // 9.10. 03.3x PT: 0,45 taivaalla liian karkea, likainen → 0,32 (yö samassa suhteessa)
                Hehku = yo ? 0.4f : 0.25f,
                Vinjetti = yo ? 0.26f : 0.24f,
                // Kaukainen pehmennys (DoF Gaussian ≥ 4 km) POIS 9.10. 02.1x: kuvaparissa koko kuva sumeni (reunatiheys 16,8 → 2,7 myös
                // lähellä; pallokameran syvyysalue ei sovi Gaussian-DoF:lle). Pehmeys tulee hehkusta ja rakeesta; kaukoutu LS2:n ilmakehästä.
                Pehmennys = false,
            };
            if (kuuma) { a.Rae = 0f; a.Hehku = 0f; a.Pehmennys = false; }
            return a;
        }
    }
}
