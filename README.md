# Dynamic Footer Proof of Concept

This is a quick attempt to prove a design concept. The concept is for a
navigation footer whose buttons fade into the article header whenever the
article comes into view.

It is still a bit rough and buggy at this stage. Since the
`IntersectionObserver` isn't exactly setup right, it's working nicely when
you scroll down, but not so much when scrolling up. Additionally, it doesn't
behave well if more than one article are visible at the same time.
