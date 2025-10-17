import { useState } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function Footer() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmitReview = () => {
    if (name && comment) {
      const newReview: Review = {
        id: Date.now().toString(),
        name,
        rating,
        comment,
        date: new Date().toLocaleDateString('en-IN')
      };
      setReviews([newReview, ...reviews]);
      setName('');
      setComment('');
      setRating(5);
      setShowReviewForm(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <footer className="py-16 bg-card border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">User Reviews</Badge>
          <h2 className="text-3xl font-bold font-heading mb-2">What People Say</h2>
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-4xl font-bold">{averageRating}</span>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.round(Number(averageRating)) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
              </div>
            </div>
          )}
        </div>

        {reviews.length === 0 && !showReviewForm && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">
              Be the first to review NYAYA MITRA AI
            </p>
            <Button
              onClick={() => setShowReviewForm(true)}
              data-testid="button-first-review"
              className="hover-elevate active-elevate-2"
            >
              Write First Review
            </Button>
          </div>
        )}

        {showReviewForm && (
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Rating</label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-8 w-8 cursor-pointer transition-colors ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`}
                      onClick={() => setRating(i + 1)}
                      data-testid={`star-${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Your Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  data-testid="input-reviewer-name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Your Review</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows={4}
                  data-testid="input-review-comment"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitReview}
                  disabled={!name || !comment}
                  data-testid="button-submit-review"
                  className="hover-elevate active-elevate-2"
                >
                  Submit Review
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                  data-testid="button-cancel-review"
                  className="hover-elevate active-elevate-2"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {reviews.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {reviews.map((review) => (
                <Card key={review.id} data-testid={`review-${review.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {!showReviewForm && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewForm(true)}
                  data-testid="button-add-review"
                  className="hover-elevate active-elevate-2"
                >
                  Add Your Review
                </Button>
              </div>
            )}
          </>
        )}

        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            © 2025 NYAYA MITRA AI. All rights reserved. | Made with ❤️ for India
          </p>
        </div>
      </div>
    </footer>
  );
}
