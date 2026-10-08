// HISTORIAMOOTTORI E3: KAPPELIN VALOARVOITUKSEN VAIHEET 1–11 (Linssiseppä 2, 8.10.2026; docs/raportit/kasikirjoitus-olavinlinna-kappeli-e3.md
// kohdat 2–3, pelattavuusmalli kohta 11 "arvoitus ja jumi"). Puhdas tila: sovitin (SeikkailuKappeli, SeikkailuKynttilat, SeikkailuEsineet)
// kertoo tapahtumat (Teko), lukee vaiheen (Pulun vihjeet, tallennus) ja kertalaukaisut (KappalainenTulee, Edistyi). Säännöt:
// - Saumat näkyvät vain, kun oma kynttilä palaa alttaripöydällä seinän vieressä eikä yksikään alttarikynttilä pala (iso valo pettää).
// - Ensimmäinen raapaisu tai 100 s oven lukitsemisesta tuo kappalaisen, kerran yritystä kohden; hän sulkee avoimen luukun.
// - Luukun ollessa auki kädessä kannettu liekki sammuu luukun edessä ja portaikossa; ikuinen valo ei sammu, joten oman kynttilän voi aina
//   sytyttää uudelleen (ei jumia). Neljä kiveä × kolme raapaisua → nyytti → kalkki ja pateeni alttarille, liuskekivi laukkuun (10 s:n
//   jälkeen Fogg tekee sen itse).
// - Tallennus aina, kun vaihe etenee, ja oven lukittuessa ("pimeä kappeli"); kiinnijäänti palauttaa viimeisimmän tallennuksen.
// Vaiheet 3–5 (kilvet, veto, koputus) ovat vihjeitä: myöhemmän vaiheen saavuttaminen kuittaa ne.
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum KappeliTeko
    {
        KohtausAlkoi, VoutiLahti, OviLukittu,                                      // kohtaus (vaiheet 1–2), sovitin
        SytytaOma, Puhalla, SytytaAlttari, SammutaAlttari,                          // valo (oma kynttilä ikuisesta valosta)
        LiekkiKilville, AvaaLuukku, SuljeLuukku, LiekkiVetoon, LiekkiLuukulle,      // 3–4 (liekki kädessä < 1 m kilvistä / kätkön alla / luukun edessä)
        KoputaOntto, KoputaUmpi,                                                    // 5
        AsetaKynttila, OtaKynttila,                                                 // 6 ja 8 (alttaripöydälle seinän viereen)
        Raapaise, RaapaiseUmpi, HeitaKivi,                                          // 9 ja väärät yritykset
        AvaaNyytti, KalkkiAlttarille, PateeniAlttarille, LiuskekiviLaukkuun,        // 10–11
        KappalainenLahti, Kiinni,                                                   // sovitin
    }

    public sealed class KappelinArvoitus
    {
        public const int Kivia = 4, Raapaisuja = 3, Valmis = 12;
        public const double PaluuS = 100, AsetusS = 10;

        public bool KohtausAlkoi, KohtausOhi, Pimea, OmaPalaa = true, Asetettu, AlttariPalaa, LuukkuAuki;
        public bool KilvetNahty, VetoNahty, Koputettu, SaumatNahty, KappalainenTulossa, KappalainenKaynyt;
        public bool Loyto, KalkkiAlttarilla, PateeniAlttarilla, LiuskekiviLaukussa;
        public int KiviaIrti, Raapaisut;
        /// <summary>Kertalaukaisut sovittimelle (nollaa itse): kappalainen lähtee paluuseen (vaihe 7); vaihe eteni, kivi irtosi tai löytö
        /// (Vihjeet.Edistys); tallennuspiste.</summary>
        public bool KappalainenTulee, Edistyi, Tallennettiin;
        double pimeaS, loytoS;
        KappelinArvoitus tallennus;

        public bool SaumatNakyvat => Asetettu && OmaPalaa && !AlttariPalaa;
        public bool Asetuttu => KalkkiAlttarilla && PateeniAlttarilla && LiuskekiviLaukussa;

        /// <summary>Seuraava vaihe 1–11 (Pulun vihjeen kohde) tai 12 = valmis.</summary>
        public int Vaihe
        {
            get
            {
                if (!KohtausOhi) return 1;
                if (!Pimea) return 2;
                if (!SaumatNahty) return !KilvetNahty ? 3 : !VetoNahty ? 4 : !Koputettu ? 5 : 6;
                if (!KappalainenKaynyt) return 7;
                if (KiviaIrti < Kivia) return SaumatNakyvat ? 9 : 8;
                if (!Loyto) return 10;
                return Asetuttu ? Valmis : 11;
            }
        }

        public KappelinArvoitus() { Tallenna(); Tallennettiin = false; }

        /// <summary>Kopio (myös viimeisin tallennus mukana; tallennus itse on muuttumaton).</summary>
        public KappelinArvoitus Kopio() => (KappelinArvoitus)MemberwiseClone();

        /// <summary>Tapahtuma; palauttaa, muuttiko se tilaa (sovitin ei tarjoa toimintoa, jos ei).</summary>
        public bool Teko(KappeliTeko t)
        {
            int ennen = Vaihe, kivetEnnen = KiviaIrti; bool loytoEnnen = Loyto;
            bool muuttui = Tee(t);
            if (SaumatNakyvat) SaumatNahty = true;
            if (Vaihe > ennen || KiviaIrti > kivetEnnen || Loyto && !loytoEnnen) Edistyi = true;
            if (t != KappeliTeko.Kiinni && (Vaihe > ennen || t == KappeliTeko.OviLukittu && muuttui)) Tallenna();
            return muuttui;
        }

        bool Tee(KappeliTeko t)
        {
            switch (t)
            {
                case KappeliTeko.KohtausAlkoi: if (KohtausAlkoi) return false; KohtausAlkoi = true; return true;
                case KappeliTeko.VoutiLahti: if (!KohtausAlkoi || KohtausOhi) return false; KohtausOhi = true; return true;
                case KappeliTeko.OviLukittu: if (!KohtausOhi || Pimea) return false; Pimea = true; AlttariPalaa = false; pimeaS = 0; return true;
                case KappeliTeko.SytytaOma: if (Asetettu || OmaPalaa) return false; OmaPalaa = true; return true;
                case KappeliTeko.Puhalla: if (!OmaPalaa || Asetettu) return false; OmaPalaa = false; return true;   // pöydällä oleva otetaan ensin käteen
                case KappeliTeko.SytytaAlttari: if (!Pimea || AlttariPalaa || !OmaPalaa || Asetettu) return false; AlttariPalaa = true; return true;
                case KappeliTeko.SammutaAlttari: if (!AlttariPalaa) return false; AlttariPalaa = false; return true;
                case KappeliTeko.LiekkiKilville: if (!Pimea || KilvetNahty || !OmaPalaa || Asetettu || AlttariPalaa) return false; KilvetNahty = true; return true;
                case KappeliTeko.AvaaLuukku: if (LuukkuAuki) return false; LuukkuAuki = true; return true;
                case KappeliTeko.SuljeLuukku: if (!LuukkuAuki) return false; LuukkuAuki = false; return true;
                case KappeliTeko.LiekkiVetoon: if (!Pimea || VetoNahty || !LuukkuAuki || !OmaPalaa || Asetettu) return false; VetoNahty = true; return true;
                case KappeliTeko.LiekkiLuukulle: if (!LuukkuAuki || !OmaPalaa || Asetettu) return false; OmaPalaa = false; return true;   // liekki repeää ja sammuu
                case KappeliTeko.KoputaOntto: if (!Pimea || Koputettu) return false; Koputettu = true; return true;
                case KappeliTeko.KoputaUmpi: return false;
                case KappeliTeko.AsetaKynttila: if (Asetettu || !Pimea) return false; Asetettu = true; return true;
                case KappeliTeko.OtaKynttila: if (!Asetettu) return false; Asetettu = false; return true;
                case KappeliTeko.Raapaise:
                    if (!SaumatNakyvat || KiviaIrti >= Kivia) return false;
                    if (!KappalainenKaynyt && !KappalainenTulossa) { KappalainenTulossa = true; KappalainenTulee = true; }
                    if (++Raapaisut >= Raapaisuja) { Raapaisut = 0; KiviaIrti++; }
                    return true;
                case KappeliTeko.RaapaiseUmpi: case KappeliTeko.HeitaKivi: return false;   // terä kirskahtaa / kolahdus: vouti (sovitin), ei tilaa
                case KappeliTeko.AvaaNyytti: if (KiviaIrti < Kivia || Loyto) return false; Loyto = true; loytoS = 0; return true;
                case KappeliTeko.KalkkiAlttarille: if (!Loyto || KalkkiAlttarilla) return false; KalkkiAlttarilla = true; return true;
                case KappeliTeko.PateeniAlttarille: if (!Loyto || PateeniAlttarilla) return false; PateeniAlttarilla = true; return true;
                case KappeliTeko.LiuskekiviLaukkuun: if (!Loyto || LiuskekiviLaukussa) return false; LiuskekiviLaukussa = true; return true;
                case KappeliTeko.KappalainenLahti: if (!KappalainenTulossa) return false; KappalainenTulossa = false; KappalainenKaynyt = true; LuukkuAuki = false; return true;
                case KappeliTeko.Kiinni: Palauta(); return true;
            }
            return false;
        }

        /// <summary>Kehys: 100 s oven lukitsemisesta → kappalainen palaa (ellei jo raapaisusta); 10 s löydöstä → Fogg asettaa itse.</summary>
        public void Paivita(double dt)
        {
            int ennen = Vaihe;
            if (Pimea && !KappalainenKaynyt && !KappalainenTulossa && (pimeaS += dt) >= PaluuS) { KappalainenTulossa = true; KappalainenTulee = true; }
            if (Loyto && !Asetuttu && (loytoS += dt) >= AsetusS) { KalkkiAlttarilla = PateeniAlttarilla = LiuskekiviLaukussa = true; }
            if (Vaihe > ennen) { Edistyi = true; Tallenna(); }
        }

        void Tallenna() { var t = Kopio(); t.tallennus = null; tallennus = t; Tallennettiin = true; }

        /// <summary>Kiinnijäänti: viimeisin tallennus (myös kappalaisen uusi käynti mahdollinen, jos sitä ei ollut tallennettu).</summary>
        void Palauta()
        {
            var t = tallennus ?? new KappelinArvoitus();
            KohtausAlkoi = t.KohtausAlkoi; KohtausOhi = t.KohtausOhi; Pimea = t.Pimea; OmaPalaa = t.OmaPalaa; Asetettu = t.Asetettu; AlttariPalaa = t.AlttariPalaa;
            LuukkuAuki = t.LuukkuAuki; KilvetNahty = t.KilvetNahty; VetoNahty = t.VetoNahty; Koputettu = t.Koputettu; SaumatNahty = t.SaumatNahty;
            KappalainenTulossa = false; KappalainenKaynyt = t.KappalainenKaynyt; Loyto = t.Loyto; KalkkiAlttarilla = t.KalkkiAlttarilla;
            PateeniAlttarilla = t.PateeniAlttarilla; LiuskekiviLaukussa = t.LiuskekiviLaukussa; KiviaIrti = t.KiviaIrti; Raapaisut = t.Raapaisut;
            pimeaS = 0; loytoS = 0;
        }

        static readonly string[] Liput = { "kohtaus", "ohi", "pimea", "oma", "asetettu", "alttari", "luukku", "kilvet", "veto", "koputus", "saumat", "kappalainen", "loyto", "kalkki", "pateeni", "liuskekivi" };
        bool[] Taulu() => new[] { KohtausAlkoi, KohtausOhi, Pimea, OmaPalaa, Asetettu, AlttariPalaa, LuukkuAuki, KilvetNahty, VetoNahty, Koputettu, SaumatNahty, KappalainenKaynyt, Loyto, KalkkiAlttarilla, PateeniAlttarilla, LiuskekiviLaukussa };

        /// <summary>Tallennukseen (SeikkailuTallennus.Arvoitus): kappeli = vaihe, kappeli-liput = bittikenttä, kappeli-kivet = kivet × 10 + raapaisut.
        /// Kirjoittaa viimeisimmän tallennuspisteen tilan (kuten kiinnijäänti palauttaa).</summary>
        public void Kirjoita(SeikkailuTallennus s)
        {
            var t = tallennus ?? this; var l = t.Taulu(); int b = 0;
            for (int i = 0; i < l.Length; i++) if (l[i]) b |= 1 << i;
            s.Arvoitus["kappeli"] = t.Vaihe; s.Arvoitus["kappeli-liput"] = b; s.Arvoitus["kappeli-kivet"] = t.KiviaIrti * 10 + t.Raapaisut;
        }

        /// <summary>Jatka tallennuksesta: palauttaa tilan; puuttuva tieto = alku.</summary>
        public static KappelinArvoitus Lue(SeikkailuTallennus s)
        {
            var a = new KappelinArvoitus();
            if (s == null || !s.Arvoitus.TryGetValue("kappeli-liput", out int b)) return a;
            bool L(string n) => (b & 1 << Array.IndexOf(Liput, n)) != 0;
            a.KohtausAlkoi = L("kohtaus"); a.KohtausOhi = L("ohi"); a.Pimea = L("pimea"); a.OmaPalaa = L("oma"); a.Asetettu = L("asetettu"); a.AlttariPalaa = L("alttari");
            a.LuukkuAuki = L("luukku"); a.KilvetNahty = L("kilvet"); a.VetoNahty = L("veto"); a.Koputettu = L("koputus"); a.SaumatNahty = L("saumat");
            a.KappalainenKaynyt = L("kappalainen"); a.Loyto = L("loyto"); a.KalkkiAlttarilla = L("kalkki"); a.PateeniAlttarilla = L("pateeni"); a.LiuskekiviLaukussa = L("liuskekivi");
            if (s.Arvoitus.TryGetValue("kappeli-kivet", out int k)) { a.KiviaIrti = Math.Clamp(k / 10, 0, Kivia); a.Raapaisut = Math.Clamp(k % 10, 0, Raapaisuja - 1); }
            a.Tallenna(); a.Tallennettiin = false;
            return a;
        }

        /// <summary>Tila merkkijonona (testit ja loki).</summary>
        public string Avain()
        {
            var l = Taulu(); var c = new char[l.Length];
            for (int i = 0; i < l.Length; i++) c[i] = l[i] ? '1' : '0';
            return new string(c) + (KappalainenTulossa ? "T" : "-") + KiviaIrti + Raapaisut;
        }
    }
}
