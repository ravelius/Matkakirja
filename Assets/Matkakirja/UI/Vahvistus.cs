// VAHVISTUSDIALOGI (Natiivi-UI, erä 1): verkkopelin #nollaa-dialog -kaava.
// Himmennys rgba(14,9,4,.72) koko ruudun yli (myös turva-alueen ulkopuolelle),
// pergamenttikortti keskellä: otsikko, teksti, napit oikealla
// (.ghost peruuta + .primary vahvista). Himmennyksen napautus = peruuta.
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Vahvistus
    {
        readonly VisualElement himmennys;
        readonly Label otsikko, teksti;
        readonly Button peru, ok;
        Action vahvistettu;

        public bool Auki { get; private set; }

        public Vahvistus(UiKerros kerros)
        {
            var juuri = kerros.Juuri(UiKerros.Valikot);
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });

            var kortti = new Kortti("mk-vahvistus");
            himmennys.Add(kortti);
            otsikko = Rakenne.Teksti("", "mk-kortti__otsikko", kortti.Sisus);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            teksti = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus);
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            peru = Rakenne.Nappi("Peruuta", "mk-nappi--haamu", Sulje, napit);
            ok = Rakenne.Nappi("", "mk-nappi--kulta", () => { var v = vahvistettu; Sulje(); v?.Invoke(); }, napit);
            Rakenne.Tausta(ok, Kuviot.Kulta);
            Kirjasimet.Aseta(napit, Kirjasin.Kone);
            Kirjasimet.Aseta(ok, Kirjasin.KoneLihava);
        }

        public void Kysy(string otsikkoTeksti, string leipa, string peruTeksti, string okTeksti, Action kunVahvistettu)
        {
            otsikko.text = otsikkoTeksti;
            teksti.text = leipa;
            peru.Q<Label>(className: "mk-nappi__teksti").text = peruTeksti;
            ok.Q<Label>(className: "mk-nappi__teksti").text = okTeksti;
            vahvistettu = kunVahvistettu;
            Auki = true;
            Rakenne.Nayta(himmennys, true, 320);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            vahvistettu = null;
            Rakenne.Nayta(himmennys, false, 250);
            SyoteLukko.Vapauta(this);
        }
    }
}
