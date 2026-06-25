import { Star } from "lucide-react";
import { business } from "@/config/business";

const Testimonials = () => {
  const reviews = [
    {
      quote:
        "Our power went out for three days after the last nor'easter and we never noticed — the generator kicked on within seconds and ran the whole house, well pump included. Best decision we made for this home.",
      name: "Mark R.",
      town: "Holmdel",
    },
    {
      quote:
        "Clean, professional install from start to finish. They handled the permits, sized everything to our load, and walked us through the transfer switch. The crew clearly does this all day, every day.",
      name: "Jennifer K.",
      town: "Middletown",
    },
    {
      quote:
        "We signed up for their maintenance plan and it's paid for itself in peace of mind. They catch the small stuff before storm season, so the unit always starts when JCP&L goes down. Highly recommend.",
      name: "Anthony D.",
      town: "Colts Neck",
    },
  ];

  return (
    <section id="reviews" className="section bg-muted border-t border-border">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center">
          <div className="eyebrow">Reviews</div>
          <h2 className="display text-3xl md:text-5xl text-balance">
            What {business.county} homeowners say
          </h2>
        </div>

        {/* Rating summary */}
        <div className="flex justify-center mt-8 md:mt-10">
          <div className="card-soft flex flex-wrap items-center justify-center gap-5 px-6 py-4 md:px-8">
            <div className="font-headline font-bold text-4xl md:text-5xl text-foreground">
              {business.stats.googleRating}
            </div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber text-amber" />
                ))}
              </div>
              <div className="font-body text-sm text-muted-foreground mt-1.5">
                Based on{" "}
                <strong className="font-semibold text-foreground">
                  {business.stats.reviewCount}
                </strong>{" "}
                reviews
              </div>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="mt-10 md:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.name} className="card-soft p-7 flex flex-col">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-[18px] w-[18px] fill-amber text-amber" />
                ))}
              </div>
              <blockquote className="font-body text-[15px] text-foreground/90 leading-relaxed mt-4 flex-1">
                "{review.quote}"
              </blockquote>
              <figcaption className="font-body text-sm font-semibold text-foreground mt-5">
                {review.name},{" "}
                <span className="font-normal text-muted-foreground">
                  {review.town}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
