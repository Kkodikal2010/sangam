export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-serif font-bold text-neutral-900">
            Success Stories
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Real couples who found their perfect match through Sangam's AI-powered platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=48" alt="Ravi and Sneha" className="w-16 h-12 rounded-lg object-cover" />
              <div>
                <h4 className="font-semibold text-neutral-900">Ravi & Sneha</h4>
                <p className="text-neutral-600 text-sm">Bangalore</p>
              </div>
            </div>
            <div className="flex text-[#FF9800] mb-4">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <blockquote className="text-neutral-700 leading-relaxed mb-4">
              "The AI compatibility score was incredibly accurate! We matched on 92% and it's amazing how well we understand each other. Married last month and couldn't be happier!"
            </blockquote>
            <div className="text-[#E91E63] font-medium text-sm">AI Match Score: 92%</div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <img src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=48" alt="Amit and Kavya" className="w-16 h-12 rounded-lg object-cover" />
              <div>
                <h4 className="font-semibold text-neutral-900">Amit & Kavya</h4>
                <p className="text-neutral-600 text-sm">Mumbai</p>
              </div>
            </div>
            <div className="flex text-[#FF9800] mb-4">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <blockquote className="text-neutral-700 leading-relaxed mb-4">
              "Traditional matchmaking couldn't find what Sangam's AI did in just 2 weeks. The personality insights helped us connect on a deeper level from day one."
            </blockquote>
            <div className="text-[#E91E63] font-medium text-sm">AI Match Score: 88%</div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=48" alt="Deepak and Priya" className="w-16 h-12 rounded-lg object-cover" />
              <div>
                <h4 className="font-semibold text-neutral-900">Deepak & Priya</h4>
                <p className="text-neutral-600 text-sm">Delhi</p>
              </div>
            </div>
            <div className="flex text-[#FF9800] mb-4">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <blockquote className="text-neutral-700 leading-relaxed mb-4">
              "The compatibility explanations made all the difference. We understood why we were a good match before even meeting. Planning our wedding for next year!"
            </blockquote>
            <div className="text-[#E91E63] font-medium text-sm">AI Match Score: 95%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
