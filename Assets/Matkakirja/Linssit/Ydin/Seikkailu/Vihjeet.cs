// HISTORIAMOOTTORI: PULUN VIHJEPORTAAT (Siirtoseppä 7.10.2026; pelattavuusmalli-olavinlinna.md kohta 5). Tasot 1 katse, 2 lento,
// 3 näyttö. Pyydettäessä (Pulun reunakuvan napautus) taso nousee heti, enintään 3, napautusten väli ≥ 10 s; vaarassa vain katse.
// Itsestään taso 2, kun edistystä ei ole tullut 180 s:iin (tyrmässä 20 s), kerran jumia kohden, ei vaarassa, keskustelussa eikä huoneen
// ensimmäisellä minuutilla. Edistys (uusi osa, arvoitusvaihe, avainesine) nollaa tason.
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class Vihjeet
    {
        public const double PyyntoValiS = 10, JumiS = 180, TyrmaJumiS = 20, HuoneRauhaS = 60;
        public int Taso { get; private set; }
        double kello, viimePyynto = double.NegativeInfinity, edistys, huoneAlku;
        bool automaattinenKaytetty;
        public bool Tyrmassa;

        /// <summary>Pelaaja pyytää vihjettä: palauttaa näytettävän tason (1–3) tai 0 (liian pian edellisestä).</summary>
        public int Pyyda(bool vaara)
        {
            if (kello - viimePyynto < PyyntoValiS) return 0;
            viimePyynto = kello;
            if (vaara) return 1;
            Taso = Math.Min(3, Taso + 1);
            return Taso;
        }

        /// <summary>Kehys: palauttaa 2, jos automaattinen vihje annetaan nyt (kerran jumia kohden), muuten 0.</summary>
        public int Paivita(double dt, bool vaara, bool keskustelu)
        {
            kello += dt;
            if (automaattinenKaytetty || vaara || keskustelu || kello - huoneAlku < HuoneRauhaS) return 0;
            if (kello - edistys < (Tyrmassa ? TyrmaJumiS : JumiS)) return 0;
            automaattinenKaytetty = true; Taso = Math.Max(Taso, 2);
            return 2;
        }

        /// <summary>Edistys (arvoitusvaihe, avainesine): taso ja jumiajastin nollaan.</summary>
        public void Edistys() { edistys = kello; Taso = 0; automaattinenKaytetty = false; }

        /// <summary>Uusi huone (osa): edistys ja minuutin rauha ennen automaattista vihjettä.</summary>
        public void UusiHuone() { Edistys(); huoneAlku = kello; }
    }
}
