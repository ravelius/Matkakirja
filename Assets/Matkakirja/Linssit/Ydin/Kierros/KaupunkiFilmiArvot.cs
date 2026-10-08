// KUUMAILMAPALLON ELOKUVAMAINEN JÄLKIKÄSITTELY: arvot (omistaja 9.10.2026 "pehmennys ja rae ja värien tummennus"; Natiiviseppä,
// juna 170). Moottoriton valinta päivä/yö ja lämmön mukaan; KaupunkiFilmi (Unity) vie ne URP-volyymiin. Yksi profiili, ei säätimiä
// pelaajalle. ShadowsMidtonesHighlights: rgb = sävy (1 = neutraali), w = valotuksen siirto (negatiivinen tummentaa).
//   päivä: varjot viileät ja −0,08, keskisävyt −0,04, valot lämpimät; saturaatio −8; rae 0,22; pehmennys kaukana; hehku 0,25; vinjetti 0,18
//   yö:    kevyempi tummennus (−0,04 / −0,02), saturaatio −4, rae 0,28 (yörae luonteva), hehku 0,4 (valot), vinjetti 0,22
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
                VarjoR = 0.94f, VarjoG = 0.97f, VarjoB = 1.04f,
                ValoR = 1.04f, ValoG = 1.01f, ValoB = 0.95f,
                VarjoTummennus = yo ? -0.04f : -0.08f,
                KeskiTummennus = yo ? -0.02f : -0.04f,
                Saturaatio = yo ? -4f : -8f,
                Rae = yo ? 0.28f : 0.22f,
                Hehku = yo ? 0.4f : 0.25f,
                Vinjetti = yo ? 0.22f : 0.18f,
                Pehmennys = true,
            };
            if (kuuma) { a.Rae = 0f; a.Hehku = 0f; a.Pehmennys = false; }
            return a;
        }
    }
}
